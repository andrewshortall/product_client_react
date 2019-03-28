import React from 'react'
import logo from 'assets/midgard-logo.svg';
import Card from 'midgard/components/Card/Card';
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
        {
          id: 1,
          image: logo,
          title: 'Item name',
          description: 'Overview, an intro using a couple of sentences',
          price: 'Price',
          tags: ['Dark green, Neon green']
        },
      ]
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
    for (const item of this.state.products) {
      items.push(<Card
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

  render() {
    return (
      <div className="products">
        <div className="products__header">
          <h3>Products list</h3>
          <button className="products__button" onClick={this.addProduct}>+ Add new</button>
        </div>
        <div className="products__list">        
          {this.createItems()}
        </div>
      </div>
    )
  }
}

export default Products;