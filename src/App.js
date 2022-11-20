import { Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import "./App.scss";
import SearchInput from "./components/SearchInput";
import { dishes } from "./data/dishes";

function App() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#EEE5DE",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: "#3A3A3A",
  }));

  const [ingredientsState, setIngredientsState] = useState([]);
  const [foundDishesState, setFoundDishesState] = useState([]);

  const searchRecipe = (options) => {
    setIngredientsState(options);
    const recipes = [...new Set(dishes)];
    let foundDishes = [];
    options.forEach((option) => {
      const found = recipes.filter((dish) => {
        if (dish.ingredients.first.indexOf(option) >= 0) {
          dish.found.first = true;
        } else if (dish.ingredients.second.indexOf(option) >= 0) {
          dish.found.second = true;
        } else {
          dish.found.first = false;
          dish.found.second = false;
        }
        switch (dish.ingredients.count) {
          case 1:
            if (dish.found.first) {
              return dish;
            }
            break;

          case 2:
            if (dish.found.first && dish.found.second) {
              return dish;
            }
            break;
          default:
            return null;
        }
        return null;
      });
      foundDishes = [...foundDishes, ...found];
    });
    foundDishes = [...new Set(foundDishes)];
    setFoundDishesState(foundDishes);
  };

  const findIngredient = (ingredient) => {
    let output = "";
    ingredientsState.indexOf(ingredient) >= 0
      ? (output = <span className="found">{ingredient}</span>)
      : (output = <span>{ingredient}</span>);
    return output;
  };

  return (
    <div className="App">
      <header className="App-header"></header>
      <SearchInput setIngredients={searchRecipe} />
      <Grid container spacing={2} className="dishes">
        {foundDishesState.map((dish, index) => {
          return (
            <Grid justifyContent="center" item xs={4}>
              <Item key={index} className="dish">
                <img
                  src={process.env.PUBLIC_URL + dish?.image}
                  alt={dish.name}
                />
                <div>
                  <h4>{dish.name}</h4>
                  <div className="price">
                    <img
                      width="24px"
                      height="24px"
                      src={process.env.PUBLIC_URL + "assets/img/Glim.png"}
                      alt="Glim"
                    />
                    <span>{dish.price}</span>
                  </div>
                  {!!dish.ingredients.first.length && (
                    <div className="ingredients">
                      (<strong>First: </strong>
                      {dish.ingredients.first.map((ingredient) =>
                        findIngredient(ingredient)
                      )}
                      )
                    </div>
                  )}
                  {!!dish.ingredients.second.length && (
                    <div className="ingredients">
                      (
                      {!!dish.ingredients.second.length && (
                        <strong>{"Second: "}</strong>
                      )}
                      {dish.ingredients.second.map((ingredient) =>
                        findIngredient(ingredient)
                      )}
                      )
                    </div>
                  )}
                </div>
              </Item>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default App;
