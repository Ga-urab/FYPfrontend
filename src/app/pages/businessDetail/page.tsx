import React from 'react';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ShareIcon from '@mui/icons-material/Share';
import Navbar from '../navbar';
import StarIcon from '@mui/icons-material/Star';

const StaticPage = () => {
  return (
    <>
    <Navbar />
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    
      <Paper elevation={3} style={{ padding: '20px', backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
          <img
            src={'/images/useradva.png'}  
            alt="User Avatar"
            style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '15px' }}
          />
          <div>
            <h2>Name of Business</h2>
            <p>Username - Date</p>
          </div>
        </div>
        <p>Description of the business goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

        <img
            src={'/images/Rectangle 45.png'} 
            alt="Business Photo"
            style={{ width: '100%', height: 'auto', borderRadius: '5%', marginRight: '15px' }}
          />


        <div style={{ display: 'flex', alignItems: 'center', marginTop: '15px' }}>
          <IconButton>
            <StarIcon />
          </IconButton>
          <span>4 Stars</span>

          <IconButton style={{ marginLeft: '15px' }}>
            <ChatBubbleIcon />
          </IconButton>
          <span>4 Comments</span>

          <IconButton style={{ marginLeft: '15px' }}>
            <ShareIcon />
          </IconButton>
          <span>2 Shares</span>
        </div>
      </Paper>
    </div>
    </>
  );
};

export default StaticPage;
// import React from 'react';
// import Paper from '@mui/material/Paper';
// import IconButton from '@mui/material/IconButton';
// import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
// import ShareIcon from '@mui/icons-material/Share';
// import Navbar from '../navbar';
// import StarIcon from '@mui/icons-material/Star';
// import { gql, useQuery } from '@apollo/client';

// const GET_BUSINESS = gql`
//   query GetBusiness($id: String!) {
//     business(id: $id) {
//       name
//       author
//       description
//       imgUrls
//       point
//     }
//   }
// `;

// const StaticPage = () => {
//   const { loading, error, data } = useQuery(GET_BUSINESS, {
//     variables: { id: 'your-business-id' }, // Replace 'your-business-id' with the actual ID of the business
//   });

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   const business = data.business;

//   return (
//     <>
//       <Navbar />
//       {business && (
//         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//           <Paper elevation={3} style={{ padding: '20px', backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
//             <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
//               <img
//                 src={'/images/useradva.png'}  
//                 alt="User Avatar"
//                 style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '15px' }}
//               />
//               <div>
//                 <h2>{business.name}</h2>
//                 <p>{business.author} - Date</p>
//               </div>
//             </div>
//             <p>{business.description}</p>

//             <img
//               src={business.imgUrls[0]} 
//               alt="Business Photo"
//               style={{ width: '100%', height: 'auto', borderRadius: '5%', marginRight: '15px' }}
//             />

//             <div style={{ display: 'flex', alignItems: 'center', marginTop: '15px' }}>
//               <IconButton>
//                 <StarIcon />
//               </IconButton>
//               <span>{business.point} Stars</span>

//               <IconButton style={{ marginLeft: '15px' }}>
//                 <ChatBubbleIcon />
//               </IconButton>
//               <span>4 Comments</span>

//               <IconButton style={{ marginLeft: '15px' }}>
//                 <ShareIcon />
//               </IconButton>
//               <span>2 Shares</span>
//             </div>
//           </Paper>
//         </div>
//       )}
//     </>
//   );
// };

// export default StaticPage;
