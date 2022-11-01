import { createSlice } from "@reduxjs/toolkit";

const uiInitialState = {
  modalShown: false,
  modalContext: "",
  liveChatActive: false,
  totalCartItem: 0,
  totalCartPrice: 0,
  cartPage: false,
  mainPage: true,
  addMealPage: false,
  isAddingMeal: false,
  currentPage: "mainPage",
  addMealObj: [],
  infoModalActive: false,
  infoModalText: "test",
  infoModalColor: "green",
  cartItems: [],
  goToCart: false,
  whichItemToRemove: [],
};

export const uiControllerSlice = createSlice({
  name: "uiController",
  initialState: uiInitialState,
  reducers: {
    setModalActive(state, action) {
      const { modalType, modalActive } = action.payload;
      state.modalShown = modalActive;
      state.modalContext = modalType;
    },
    liveChatToggle(state) {
      state.liveChatActive = !state.liveChatActive;
    },
    setLiveChatActive(state, action) {
      state.liveChatActive = action.payload;
    },
    setMainPage(state, action) {
      state.mainPage = action.payload;
    },
    setCurrentPage(state, action) {
      const { isShow, currentPage } = action.payload;
      if (!isShow) {
        if (state.currentPage === currentPage) return;
        state.cartPage = false;
        state.mainPage = false;
        state.addMealPage = false;
      }
      state.currentPage = currentPage;
      if (isShow) {
        switch (currentPage) {
          case "mainPage":
            state.mainPage = true;
            break;
          case "addMealPage":
            state.addMealPage = true;
            break;
          case "cartPage":
            state.cartPage = true;
            break;
          default:
        }
      }
    },
    setAddMealPage(state, action) {
      state.addMealPage = action.payload;
    },
    setCartPage(state, action) {
      state.cartPage = action.payload;
    },
    setAddMealObj(state, action) {
      state.addMealObj = action.payload;
    },
    setIsAddingMeal(state, action) {
      state.isAddingMeal = action.payload;
    },
    setTotalCartItem(state) {
      state.totalCartItem = 0;
      state.cartItems.forEach((meal) => {
        state.totalCartItem = state.totalCartItem + meal.mealQuantity;
      });
    },
    setInfoModal(state, action) {
      const { infoModalActive, infoModalText, infoModalColor } = action.payload;
      state.infoModalActive = infoModalActive;
      state.infoModalText = infoModalText;
      state.infoModalColor = infoModalColor;
    },
    setCartItems(state, action) {
      const dateNow = new Date().valueOf();
      const { currentMeal, desiredIngredients } = action.payload;

      const newCartItem = {
        mealName: currentMeal.mealName,
        mealPrice: currentMeal.mealPrice,
        mealImage: currentMeal.mealImage,
        mealIngredients: currentMeal.mealIngredients,
        mealId: currentMeal.mealId + dateNow,
        mealSize: currentMeal.mealSize,
        mealQuantity: 1,
        desiredIngredients: desiredIngredients,
      };
      state.cartItems.push(newCartItem);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    setCartItemAmount(state, action) {
      const { arrayNumber, operationType } = action.payload;

      switch (operationType) {
        case "increase":
          state.cartItems[arrayNumber].mealQuantity =
            state.cartItems[arrayNumber].mealQuantity + 1;
          break;
        case "decrease":
          if (state.cartItems[arrayNumber].mealQuantity === 1) break;

          state.cartItems[arrayNumber].mealQuantity =
            state.cartItems[arrayNumber].mealQuantity - 1;
          break;

        default:
          break;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    setLocalCartItemsAsCartItems(state, action) {
      state.cartItems = action.payload;
      if (action.payload && action.payload.length)
        action.payload.forEach((meal) => {
          state.totalCartItem = state.totalCartItem + meal.mealQuantity;
        });
    },
    removeItemFromCart(state, action) {
      state.cartItems = state.cartItems.filter((item) => {
        return item.mealId !== action.payload;
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      state.totalCartItem = 0;
      state.cartItems.forEach((meal) => {
        state.totalCartItem = state.totalCartItem + meal.mealQuantity;
      });
    },
    whichItemToRemove(state, action) {
      state.whichItemToRemove = action.payload;
    },
    totalCartPriceCalc(state) {
      state.totalCartPrice = 0;
      state.cartItems.forEach((meal) => {
        state.totalCartPrice =
          state.totalCartPrice + meal.mealPrice * meal.mealQuantity;
      });
    },
  },
});

export const uiControllerActions = uiControllerSlice.actions;

export default uiControllerSlice.reducer;
