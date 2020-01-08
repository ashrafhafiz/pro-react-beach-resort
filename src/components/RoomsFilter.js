import React, { useContext } from "react";
import { RoomContext } from "../Context";
import Title from "./Title";

const getUniqueRoomValues = (rooms, value) => {
  return [...new Set(rooms.map(room => room[value]))];
};

const RoomsFilter = props => {
  const context = useContext(RoomContext);

  // Get unique room types
  let types = getUniqueRoomValues(props.rooms, "type");
  // Add "all" to the array
  types = ["all", ...types];
  types = types.map((type, index) => {
    return (
      <option key={index} value={type}>
        {type}
      </option>
    );
  });
  // Get unique rooms' capacity
  let capacities = getUniqueRoomValues(props.rooms, "capacity");
  capacities = capacities.map((capacity, index) => {
    return (
      <option key={index} value={capacity}>
        {capacity}
      </option>
    );
  });

  const {
    handleChange,
    type,
    capacity,
    price,
    minPrice,
    maxPrice,
    minSize,
    maxSize,
    breakfast,
    pets
  } = context;
  console.log(context);

  return (
    <section className="filter-container">
      <Title title="search rooms" />
      <form className="filter-form">
        {/* select type */}
        <div className="form-group">
          <label htmlFor="type">room type</label>
          <select
            name="type"
            id="type"
            value={type}
            className="form-control"
            onChange={handleChange}
          >
            {types}
          </select>
        </div>
        {/* end of select type */}

        {/* Guests */}
        <div className="form-group">
          <label htmlFor="capacity">Guests</label>
          <select
            name="capacity"
            id="capacity"
            value={capacity}
            className="form-control"
            onChange={handleChange}
          >
            {capacities}
          </select>
        </div>
        {/* end of Guests */}

        {/* Room Price */}
        <div className="form-group">
          <label htmlFor="price">Room Price ${price}</label>
          <input
            type="range"
            name="price"
            id="price"
            min={minPrice}
            max={maxPrice}
            value={price}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        {/* end of Room Price */}

        {/* Room Size */}
        <div className="form-group">
          <label htmlFor="size">Room size range (sqft)</label>
          <div className="size-inputs">
            <input
              type="number"
              name="minSize"
              id="size"
              value={minSize}
              onChange={handleChange}
              className="size-input"
            />
            <input
              type="number"
              name="maxSize"
              id="size"
              value={maxSize}
              onChange={handleChange}
              className="size-input"
            />
          </div>
        </div>
        {/* end of Room Size */}

        {/* Room Extras */}
        <div className="form-group">
          <div className="single-extra">
            <input
              type="checkbox"
              name="breakfast"
              id="breakfast"
              checked={breakfast}
              onChange={handleChange}
            />
            <label htmlFor="breakfast">breakfast</label>
          </div>
          <div className="single-extra">
            <input
              type="checkbox"
              name="pets"
              id="pets"
              checked={pets}
              onChange={handleChange}
            />
            <label htmlFor="pets">pets</label>
          </div>
        </div>
        {/* end of Room Extras */}
      </form>
    </section>
  );
};

export default RoomsFilter;
