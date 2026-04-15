// import axios from 'axios';

// const apiUrl = "https://localhost:7271"

// export default {
//   getTasks: async () => {
//     const result = await axios.get(`${apiUrl}/items`)    
//     return result.data;
//   },

//   addTask: async(name)=>{
//     console.log('addTask', name)
//     //TODO
//     return {};
//   },

//   setCompleted: async(id, isComplete)=>{
//     console.log('setCompleted', {id, isComplete})
//     //TODO
//     return {};
//   },

//   deleteTask:async()=>{
//     console.log('deleteTask')
//   }
// };

import axios from 'axios';

// 1. הגדרת כתובת ה-API כברירת מחדל 
axios.defaults.baseURL = "https://localhost:7108";

// 2. הוספת Interceptor שתופס שגיאות ורושם אותן ללוג
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.error("API Error intercepted:", error.response ? error.response.data : error.message);
    return Promise.reject(error);
  }
);

export default {
  getTasks: async () => {
    const result = await axios.get('/items');
    return result.data;
  },

  addTask: async (name) => {
    console.log('addTask', name);
    const result = await axios.post('/items', { name: name, isComplete: false });
    return result.data;
  },

 // שינוי הפונקציה כך שתקבל גם את השם (name)
setCompleted: async (id, isComplete, name) => {
    console.log('Updating item:', { id, isComplete, name });
    
    // עכשיו אנחנו שולחים לשרת את ה-name האמיתי שהגיע מהמשימה
    const result = await axios.put(`/items/${id}`, { 
        id: id, 
        isComplete: isComplete, 
        name: name 
    });
    
    return result.data;
},
  deleteTask: async (id) => {
    console.log('deleteTask', id);
    const result = await axios.delete(`/items/${id}`);
    return result.data;
  }
};
