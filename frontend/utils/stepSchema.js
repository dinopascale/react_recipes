const filter = {
  general: ['name', 'img', 'sharable', 'tag'],
  times: ['preparationTime', 'cookTime', 'serves', 'difficulty'],
  directions: ['directions'],
  ingredients: ['ingredients'],
  recap: [
    'name',
    'img',
    'sharable',
    'preparationTime',
    'cookTime',
    'serves',
    'difficulty',
    'directions',
    'ingredients'
  ]
};

// const booleanToString = bool => {
//   return bool ? 'true' : 'false';
// };

export const chunkSchema = (schema, name) => {
  return schema.filter(el => filter[name].includes(el.name));
};

export const chunkValues = (values, name) => {
  return Object.keys(values)
    .filter(key => filter[name].includes(key))
    .reduce((obj, key) => {
      obj[key] = values[key];
      return obj;
    }, {});
};
