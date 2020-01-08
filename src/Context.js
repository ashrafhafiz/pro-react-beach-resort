import React, { Component } from "react";
// import items from "./data";
import Client from "./Contentful";

const RoomContext = React.createContext();

class RoomProvider extends Component {
  state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false
  };

  formatData = items => {
    let tempItems = items.map(item => {
      let id = item.sys.id;
      let images = item.fields.images.map(image => image.fields.file.url);

      let room = { ...item.fields, images, id };

      return room;
    });
    return tempItems;
  };

  getRoomBySlug = slug => {
    let tempRooms = [...this.state.rooms];
    const room = tempRooms.find(room => room.slug === slug);
    return room;
  };

  getData = async () => {
    try {
      let response = await Client.getEntries({
        content_type: "BeachResort",
        order: "sys.createdAt"
        // order: "fields.price"  // ascending
        // order: "-fields.price" // descending
      });
      let rooms = this.formatData(response.items);
      let featuredRooms = rooms.filter(room => room.featured === true);
      let minPrice = Math.min(...rooms.map(room => room.price));
      let maxPrice = Math.max(...rooms.map(room => room.price));
      let minSize = Math.min(...rooms.map(room => room.size));
      let maxSize = Math.max(...rooms.map(room => room.size));

      this.setState({
        rooms,
        sortedRooms: rooms,
        featuredRooms,
        loading: false,
        price: maxPrice,
        minPrice,
        maxPrice,
        minSize,
        maxSize
      });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount = () => {
    // let rooms = this.formatData(items);
    // let featuredRooms = rooms.filter(room => room.featured === true);
    // let minPrice = Math.min(...rooms.map(room => room.price));
    // let maxPrice = Math.max(...rooms.map(room => room.price));
    // let minSize = Math.min(...rooms.map(room => room.size));
    // let maxSize = Math.max(...rooms.map(room => room.size));

    // this.setState({
    //   rooms,
    //   sortedRooms: rooms,
    //   featuredRooms,
    //   loading: false,
    //   price: maxPrice,
    //   minPrice,
    //   maxPrice,
    //   minSize,
    //   maxSize
    // });

    this.getData();
  };

  handleChange = e => {
    // const type = e.target.type;
    // const value = e.target.value;
    // const name = e.target.name;
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = e.target.name;

    this.setState(
      {
        [name]: value
      },
      this.filterRooms
    );
  };

  filterRooms = () => {
    let {
      rooms,
      type,
      capacity,
      price,
      minPrice,
      maxPrice,
      minSize,
      maxSize,
      breakfast,
      pets
    } = this.state;

    // Pasring capacity to integer value: cos the return form select element is a string.
    capacity = parseInt(capacity);
    // same with price
    price = parseInt(price);

    // All rooms to temp array
    let tempRooms = [...rooms];

    // Filter by type
    if (type !== "all") {
      tempRooms = tempRooms.filter(room => room.type === type);
    }

    // Filter by capacity
    if (capacity !== 1) {
      tempRooms = tempRooms.filter(room => room.capacity >= capacity);
    }

    // Filter by price
    tempRooms = tempRooms.filter(room => room.price <= price);

    // Filter by size
    tempRooms = tempRooms.filter(
      room => room.size <= maxSize && room.size >= minSize
    );

    // Filter by breakfast
    if (breakfast) {
      tempRooms = tempRooms.filter(room => room.breakfast === true);
    }
    // Filter by pets
    if (pets) {
      tempRooms = tempRooms.filter(room => room.pets === true);
    }

    // Change state
    this.setState({
      sortedRooms: tempRooms
    });
  };

  render() {
    return (
      <RoomContext.Provider
        value={{
          ...this.state,
          getRoomBySlug: this.getRoomBySlug,
          handleChange: this.handleChange
        }}
      >
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}

const RoomConsumer = RoomContext.Consumer;

// Consumer as a Higher-Order-Component
const withRoomConsumer = Component => {
  return function ConsumerWrapper(props) {
    return (
      <RoomConsumer>
        {value => <Component {...props} context={value} />}
      </RoomConsumer>
    );
  };
};

export { RoomProvider, RoomConsumer, RoomContext, withRoomConsumer };
