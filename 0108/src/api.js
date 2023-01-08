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

  export const _updateComment = async (text) => {
    return { text };
  };
  
  export const _deleteComment = async (text) => {
    return {text};
  };
  