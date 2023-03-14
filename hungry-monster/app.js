//------------- handle search button-----------
const searchFood = () => {
  const searchField = document.getElementById('mealInput');
  const searchData = searchField.value;
  //   console.log('searchData :>> ', searchData);
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchData}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      displayMealInfo(data.meals);
      //   console.log('data.meals :>> ', data.meals);
    });
};
// searchFood();
const displayMealInfo = (mealData) => {
  const mealContainer = document.getElementById('mealCard');
  mealData.forEach((item) => {
    const foodItemName = document.createElement('div');
    foodItemName.className = 'meal-items';
    itemPosition = item.idMeal;
    const mealInformation = `
        <img src ="${item.strMealThumb}">
        <h3>${item.strMeal}</h3>

        `;
    foodItemName.innerHTML = mealInformation;
    foodItemName.addEventListener('click', function () {
      //   console.log('item.idMeal :>> ', item);
      mealIngredientsInfo(item.idMeal);
    });
    mealContainer.appendChild(foodItemName);
  });
};

//API Call by fetch for meal ingredients

const mealIngredientsInfo = (mealItemName) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItemName}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      //   console.log(data.meals[0]);
      displayDetails(data.meals);
    });
};
// mealIngredientsInfo()
//meal ingredients details information

const displayDetails = (mealItemDetails) => {
  //   console.log('mealItemDetails :>> ', mealItemDetails);
  const items = mealItemDetails[0];
  console.log('items :>> ', items);
  const mealItemsInformation = document.getElementById('mealItemsInfo');
  mealItemsInformation.innerHTML = '';
  //   const strIngredientKeys = Object.keys(items).filter((key) =>
  //     key.startsWith('strIngredient')
  //   );
  //   const strIngredientValues = Object.values(items).filter((key) =>
  //     key.startsWith('strIngredient')
  //   );
  // console.log('strIngredientKeys :>> ', strIngredientKeys);
  // console.log('strIngredientValues :>> ', strIngredientValues);

  const strIngredientValues = Object.entries(items)
    .filter(([key, value]) => key.startsWith('strIngredient'))
    .map(([key, value]) => value);
  //   console.log(strIngredientValues);
  const mealItemsInformations = document.createElement('div');
  mealItemsInformations.className = 'ingredients-info';
  // console.log(items.strMeal);
  mealItemsInformations.innerHTML = `
<img src="${items.strMealThumb}">
<h1>${items.strMeal}</h1>
<p>${
    items.strInstructions.length >= 100
      ? items.strInstructions.slice(0, 100) + ' ....read more'
      : items.strInstructions
  }</p>
<h5>Ingredients</h5>
<ol id="ingredients" >

</ol>
`;
  {
    /* <ul id="ingredients" style=" list-style-type: none;">

</ul> */
  }
  mealItemsInformation.appendChild(mealItemsInformations);
  // let j = 1;
  strIngredientValues.forEach((item) => {
    // console.log('item :>> ', item, j++);
    // if (item) {
    //   const Ingredients = document.getElementById('ingredients');
    //   const li = document.createElement('li');
    //   li.innerHTML = `<li >${item}</li>`;
    //   Ingredients.appendChild(li);
    // }
    if (item) {
      const Ingredients = document.getElementById('ingredients');
      const li = document.createElement('li');
      li.textContent = item;
      Ingredients.appendChild(li);
    }
  });

};


