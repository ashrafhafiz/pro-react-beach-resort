// import React from "react";
// import RoomsFilter from "./RoomsFilter";
// import RoomsList from "./RoomsList";
// import Loading from "./Loading";
// import { RoomConsumer } from "../Context";

// const RoomsContainer = () => {
//   return (
//     <RoomConsumer>
//       {value => {
//         if (value.loading) return <Loading />;
//         return (
//           <div>
//             <RoomsFilter rooms={value.rooms} />
//             <RoomsList rooms={value.sortedRooms} />
//           </div>
//         );
//       }}
//     </RoomConsumer>
//   );
// };

// export default RoomsContainer;

// The following is an equivalent with using High-Order-Component (HOC)
import React, { Fragment } from "react";
import RoomsFilter from "./RoomsFilter";
import RoomsList from "./RoomsList";
import Loading from "./Loading";
import { withRoomConsumer } from "../Context";

const RoomsContainer = props => {
  if (props.context.loading) return <Loading />;
  return (
    <Fragment>
      <RoomsFilter rooms={props.context.rooms} />
      <RoomsList rooms={props.context.sortedRooms} />
    </Fragment>
  );
};

export default withRoomConsumer(RoomsContainer);
