export const createComment = async (text, parentId = null) => {
  
    return {
      id: Math.random().toString(),
      body: text,
      parentId,
      userId: "1",
      username: "gguki",
      day: new Date(),
      
    };
  };

  export const updateComment = async (text) => {
    return { text };
  };
  
  export const deleteComment = async () => {
    return {};
  };
  