import React from 'react'
import { FjButton } from 'freyja-react'
import styled from 'styled-components'
import { colors } from 'colors'
import { rem } from 'polished'
import { connect } from 'react-redux'
import ViewSwitcher from 'midgard/components/ViewSwitcher/ViewSwitcher'
import ProductsCardItem from './components/ProductsCardItem/ProductsCardItem'
import Crud, { CrudContext } from 'midgard/modules/crud/Crud';
import listIcon from 'assets/icon-list.svg'
import tileIcon from 'assets/icon-tile.svg'
import plusIcon from 'assets/icon-plus.svg'

const ProductsWrapper = styled.div`
  padding: 0 ${rem(24)};
  position: relative;
  flex: 1;
  margin-bottom: ${rem(24)};

  .products {
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      &__left {
        display: flex;
        align-items: center;

        > :first-child {
          margin-right: ${rem(8)};
        }
      }
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
        { name: 'List', value: 'list', active: true, icon: listIcon },
        { name: 'Tiles', value: 'tile', active: false, icon: tileIcon },
      ]
    };
    this.createItems = this.createItems.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.handleAction = this.handleAction.bind(this);
  }

  /**
   * Handles the selected action
   * @param {string} action
   * @param {any} payload
   */
  handleAction(crud, action, id, payload) {
      switch(action) {
          case 'delete':
              return crud.deleteItem({idProp:"uuid", dataProp:"results", data:payload});
          case 'update':
              return  crud.updateItem({idProp:"uuid", dataProp:"results", data:payload});
          default:
              return;
      }
  }

  /**
   * Outputs the list of products as cards
   */
  createItems(crud) {
    const items = [];
      const data = crud.getData();
      if (data && data.results && data.results.length) {
      const results = data.results;
      for (const item of results) {
        items.push(<ProductsCardItem
              product={item}
              layout={this.state.layout}
              key={item.uuid}
              options ={[
                  {value: 'delete', label: 'Delete'}
              ]}
              action={this.handleAction.bind(null, crud)}
          />);
      }
    } else {
          return (<div className="products__empty">No products found.</div>);
      }
    return items;
  }

  /**
   * Adds a new product
   */
  addProduct(crud) {
      const data = {
          name: 'New item',
          make: '',
          type: '',
          reference_id: '',
          style: '',
          model: '',
          description: '',
          status: '',
      };
      crud.createItem({idProp:"uuid", dataProp:"results", data});

  }

  /**
   * Updates the card view type
   * @param {string} layout the active view
   * @param {object} component - state of current component
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
        <Crud
            endPoint="products/products/"
            reducer="crudDataReducer"
        >
            { crud => {
                return (
                    <ProductsWrapper className="products">
                        <div className="products__header">
                            <div className="products__header__left">
                                <h3>Products list</h3>
                                <FjButton size="small" onClick={this.addProduct.bind(null,crud)}>
                                    <img src={plusIcon} />
                                    <span>Add new</span>
                                </FjButton>
                            </div>
                            <ViewSwitcher options={this.state.layoutTypes} action={(event) => this.selectLayout(event, this)} />
                        </div>
                        <div className="products__list">
                            {this.createItems(crud)}
                        </div>
                    </ProductsWrapper>
                )
            }}
        </Crud>
    )
  }
}

export default Products;
