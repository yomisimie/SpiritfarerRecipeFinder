import Select from "react-select";
import { ingredients } from "../data/ingredients";

const SearchInput = (props) => {
  const selectIngredient = (options) => {
    let ingredients = [];
    options.forEach((o) => {
      ingredients.push(o.value);
    });
    props.setIngredients(ingredients);
  };
  return <Select options={ingredients} isMulti onChange={selectIngredient} />;
};

export default SearchInput;
