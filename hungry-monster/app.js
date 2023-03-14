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
    });
};
searchFood()
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
  console.log('mealItemDetails :>> ', mealItemDetails);
  const mealItemsInformation = document.getElementById('mealItemsInfo');
  mealItemDetails.forEach((items) => {
    const mealItemsInformations = document.createElement('div');
    mealItemsInformations.className = 'ingredients-info';
    // console.log(items.strMeal);
    mealItemsInformations.innerHTML = `
    <img src="${items.strMealThumb}">
    <h1>${items.strMeal}</h1>
    <h5>Ingredients</h5>
    <ul>
    <li>${items.strIngredient1}</li>
    </ul>
    `;
    mealItemsInformation.appendChild(mealItemsInformations);

  });
};
// displayDetails()
