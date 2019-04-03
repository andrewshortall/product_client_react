import React from 'react'
import logo from 'assets/midgard-logo.svg';
import Card from 'midgard/components/Card/Card';
import Button from 'ui/Button/Button';
import './Products.scss'

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [
        {
          id: 0,
          image: logo,
          title: 'Item name',
          description: 'Overview, an intro using a couple of sentences',
          price: 'Price',
          tags: ['Dark blue']
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
      id: this.state.products.length + 1,
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
      <div className="products">
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
      </div>
    )
  }
}

export default Products;