import React from 'react'
import logo from 'assets/midgard-logo.svg'
import Card from 'midgard/components/Card/Card'
import { Button } from 'ui/Button/Button'
import styled from 'styled-components'
import { colors } from 'colors'
import { rem } from 'polished'

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
      products: [
        {
          id: Math.random().toString(36).substr(2, 5),
          image: logo,
          title: '',
          description: '',
          price: '',
          tags: ['']
        },
      ],
      cardView: 'list'
    };
    this.createItems = this.createItems.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.handleAction = this.handleAction.bind(this);
  }

  handleAction(action, id) {
    switch(action) {
      case 'delete':
      const products = this.state.products.filter(item => item.id !== id);
        return this.setState({products});
      default:
        return;
    }
  }

  createItems() {
    const items = [];
    if (!this.state.products.length) {
      return (<div className="products__empty">No products found.</div>);
    }
    for (const item of this.state.products) {
      items.push(<Card
        cardView={this.state.cardView}
        key={item.id}
        id={item.id}
        image={item.image}
        title={item.title}
        description={item.description}
        price={item.price}
        tags={item.tags}
        action={this.handleAction}
         />);
    }
    return items;
  }

  addProduct() {
    const products = this.state.products;
    products.push({
      id: Math.random().toString(36).substr(2, 5),
      image: logo,
      title: 'Item name',
      description: 'Description',
      price: 'Price',
      tags: ['Tag 1', 'Tag 2']
    });
    this.setState({products});
  }

  selectView(cardView) {
    this.setState({cardView});
  }

  render() {
    return (
      <ProductsWrapper className="products">
        <div className="products__header">
          <h3>Products list</h3>
          <div className="product__options">
            <a className={'products__view-type' + (this.state.cardView === 'list' ? ' products__view-type--active' : '')}
              onClick={() => {this.selectView('list')}}>List view</a>
            <a className={'products__view-type' + (this.state.cardView === 'tile' ? ' products__view-type--active' : '')}
              onClick={() => {this.selectView('tile')}}>Tile view</a>
          </div>
          <Button small onClick={this.addProduct}>+ Add new</Button>
        </div>
        <div className="products__list">        
          {this.createItems()}
        </div>
      </ProductsWrapper>
    )
  }
}

export default Products;