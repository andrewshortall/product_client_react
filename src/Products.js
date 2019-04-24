import React from 'react'
import { Button } from 'ui/Button/Button'
import styled from 'styled-components'
import { colors } from 'colors'
import { rem } from 'polished'
import { connect } from 'react-redux'
import { loadAllProducts, createProduct, deleteProduct, updateProduct } from './redux/Products.actions'
import ContentSwitcher from './components/ContentSwitcher/ContentSwitcher'
import ProductsCardItem from './components/ProductsCardItem/ProductsCardItem'

const ProductsWrapper = styled.div`
  padding: 0 ${rem(24)};
  position: relative;
  flex: 1;

  .products {
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__list {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      margin: 0 ${rem(16)};
    }

    &__empty {
      margin: ${rem(20)} 0;
    }

    &__view-type {
      color: ${colors.primary};
      padding: ${rem(4)} ${rem(8)};
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }

      &--active {
        background-color: ${colors.primaryLighter};
        border-radius: ${rem(4)};
      }
    }
  }
`

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      layout: 'list',
      layoutTypes: [
        { name: 'List view', value: 'list', active: true },
        { name: 'Tile view', value: 'tile', active: false },
      ]
    };
    this.createItems = this.createItems.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.handleAction = this.handleAction.bind(this);
    this.props.dispatch(loadAllProducts());
  }

  /**
   * Handles the selected action
   * @param {string} action 
   * @param {any} payload 
   */
  handleAction(action, payload) {
    switch(action) {
      case 'delete':
        return this.props.dispatch(deleteProduct(payload.id));
      case 'update':
        const oldProduct = this.props.products.find(item => item.uuid === payload.id);
        const product = {
          name: oldProduct.name,
          make: oldProduct.make,
          type: oldProduct.type,
          reference_id: oldProduct.reference_id,
          style: oldProduct.style,
          model: oldProduct.model,
          description: oldProduct.description,
          status: oldProduct.status,
          ...payload
        };
        return this.props.dispatch(updateProduct(payload.id, product));
      default:
        return;
    }
  }

  /**
   * Outputs the list of products as cards
   */
  createItems() {
    const items = [];
    if (!this.props.products || !this.props.products.length) {
      return (<div className="products__empty">No products found.</div>);
    }
    for (const item of this.props.products) {
      items.push(<ProductsCardItem
        options={{
          ...item,
          layout: this.state.layout,
          action: this.handleAction
        }}
        key={item.uuid}
        id={item.uuid}
        menuItems ={[
          {value: 'delete', label: 'Delete'}
        ]}
      />);
    }
    return items;
  }

  /**
   * Adds a new product
   */
  addProduct() {
    this.props.dispatch(createProduct({
      name: 'New item',
      make: '',
      type: '',
      reference_id: '',
      style: '',
      model: '',
      description: '',
      status: ''
    }));
  }

  /**
   * Updates the card view type
   * @param {string} layout the active view
   */
  selectLayout(layout, component) {
    const layoutTypes = component.state.layoutTypes.map(item => ({
      ...item,
      active: item.value === layout
    }));
    component.setState({layoutTypes, layout});
  }

  render() {
    return (
      <ProductsWrapper className="products">
        <div className="products__header">
          <h3>Products list</h3>
          <ContentSwitcher options={this.state.layoutTypes} action={(event) => this.selectLayout(event, this)} />
          <Button small onClick={this.addProduct}>+ Add new</Button>
        </div>
        <div className="products__list">
          {this.createItems()}
        </div>
      </ProductsWrapper>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({...ownProps, ...state.productReducer});

export default connect(mapStateToProps)(Products);
