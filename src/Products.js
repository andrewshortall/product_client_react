import React from 'react'
import Card from 'midgard/components/Card/Card'
import { Button } from 'ui/Button/Button'
import styled from 'styled-components'
import { colors } from 'colors'
import { rem } from 'polished'
import { connect } from 'react-redux'
import { loadAllProducts, createProduct, deleteProduct, updateProduct } from './redux/Products.actions'
import ContentSwitcher from './components/ContentSwitcher/ContentSwitcher'

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
      cardView: 'list',
      viewTypes: [
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
        const product = {
          name: payload.title,
          description: payload.description,
          status: payload.price,
          type: payload.tags,
        };
        return this.props.dispatch(updateProduct(payload.id, product))
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
      items.push(<Card
        disabled={this.props.updating}
        cardView={this.state.cardView}
        key={item.uuid}
        id={item.uuid}
        image={item.image}
        title={item.name}
        description={item.description}
        price={item.status}
        tags={item.type}
        action={this.handleAction}
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
      description: '',
      status: '',
      type: ''
    }));
  }

  /**
   * Updates the card view type
   * @param {string} cardView the active view
   */
  selectView(cardView, component) {
    const viewTypes = component.state.viewTypes.map(view => ({
      ...view,
      active: view.value === cardView
    }));
    component.setState({viewTypes, cardView});
  }

  render() {
    return (
      <ProductsWrapper className="products">
        <div className="products__header">
          <h3>Products list</h3>
          <ContentSwitcher options={this.state.viewTypes} action={(event) => this.selectView(event, this)} />
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
