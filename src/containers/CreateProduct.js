import React, { Component } from 'react';
import axios from 'axios';

import firebase from '../firebase';
import urlLink from '../config/url';
import './createProduct.css';

class CreateProduct extends Component {
  state = {
    name: '',
    price: 0,
    category: '',
    description: '',
    url: '',
    stock: {
      small: 0,
      medium: 0,
      large: 0,
      xlarge: 0,
    },
  }

  handleFileInput = async (e) => {
    const uploadedImage = e.target.files[0];
    console.log(uploadedImage);
    const storageRef = firebase.storage().ref();
    const imageRef = storageRef.child(`/productImages/ + ${uploadedImage.name}`);

    try {
      const snapshot = await imageRef.put(uploadedImage);
      const url = await snapshot.ref.getDownloadURL();

      await this.setState({ url });
    }
    catch (err) {
      console.log(err);
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleStockChange = (e) => {
    const newState = { ...this.state };

    newState.stock[e.target.name] = e.target.value;

    this.setState(newState);
  }

  handleProductSubmit = () => {
    const { name, price, category, description, url, stock } = this.state;

    axios.post(`${urlLink}/product/`, {
      store_id: 1, // TODO: This needs to be the current logged in user's store id.
      name,
      price,
      category,
      description,
      url,
      stock: JSON.stringify(stock),
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { url } = this.state;
    const uploadedImage = url ? <img width="200" height="100" src={url} alt="uploaded product" /> : 'no image uploaded yet';

    return (
      <div className="create-product">
        <label>Upload Image</label>
        <input type="file" accept="image/*" onChange={this.handleFileInput} />
        {uploadedImage}
        <hr />
        <label>Product Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter Product name"
          onChange={this.handleChange}
        />
        <hr />
        <label>Product Price</label>
        <input
          type="number"
          min="0.00"
          step="0.50"
          max="3000"
          name="price"
          placeholder="price"
          onChange={this.handleChange}
        />
        <hr />
        <label>Category</label>
        <select name="category" onChange={this.handleChange}>
          <option value="" selected disabled hidden>Choose here</option>
          <option value="tops">Tops</option>
          <option value="bottoms">Bottoms</option>
          <option value="Accessories">Accessories</option>
        </select>
        <hr />
        <label>Description</label>
        <textarea
          name="description"
          cols="30"
          rows="10"
          placeholder="Write product description here"
          onChange={this.handleChange}
        />
        <hr />
        <label>Stock</label>
        <input name="small" type="number" onChange={this.handleStockChange} placeholder="small" />
        <input name="medium" type="number" onChange={this.handleStockChange} placeholder="medium" />
        <input name="large" type="number" onChange={this.handleStockChange} placeholder="large" />
        <input name="xlarge" type="number" onChange={this.handleStockChange} placeholder="xlarge" />
        {/* // TODO: Need to add conditional for products that don't have sizes */}
        <input name="" type="text" />
        <p>Does your product have sizes?</p>
        <label className="switch">
          <input type="checkbox" />
          <span className="slider round" />
        </label>
        <input type="number" placeholder="stock amount" />
        <hr />
        <button type="submit" onClick={this.handleProductSubmit}>create</button>
      </div>
    );
  }
}

export default CreateProduct;
