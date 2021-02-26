import React from 'react'
import { Link } from "react-router-dom";
import "./Card.css"

const Card = (props) => {
  return (
    <Link to={`/products/${props.id}`} style={{ textDecoration: "none" }}>
      <div className="cardproduct card mb-1 mt-1" >
        <img
          className="card-img-top imgcard"
          alt=""
          src={props.img}
          style={({ width: "100%" }, { height: "200px" })}
        />
        <div className="card-body">
          <h5 style={{ textTransform: "capitalize" }} className="Cardtittle"> {props.name} </h5>
          <p className="card-text cardDescription"> {props.description} </p>
          <p className="card-text"> €{props.price} </p>
        </div>
      </div>
    </Link>
  )
}

export default Card
