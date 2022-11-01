import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import React, { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { db, storage } from '../../config/firebaseConfig';
import { uiControllerActions } from '../../store/uiControllerSlice';
import Loading from '../ui/Loading';

const EditMeal = (props) => {
  const { selectedMeal, formUploading } = props;
  const [ingredientsList, setIngredientsList] = useState('');
  console.log(selectedMeal);
  // Edit Meals
  const editMealName = useRef();
  const editMealIngredients = useRef();
  const editMealPricesXl = useRef();
  const editMealPricesMd = useRef();
  const editMealPricesSm = useRef();

  const dispatch = useDispatch();

  const deleteProductHandler = async () => {
    const deletingMealImgRef = ref(
      storage,
      `mealImages/${selectedMeal.uploadImageName}`
    );
    try {
      await deleteDoc(doc(db, 'Meals', selectedMeal.id));
      await deleteObject(deletingMealImgRef);
      props.onFinishEditing(true);
      dispatch(
        uiControllerActions.setInfoModal({
          infoModalActive: true,
          infoModalText: 'Meal Deleted Successfully',
          infoModalColor: 'green',
        })
      );
    } catch (error) {
      dispatch(
        uiControllerActions.setInfoModal({
          infoModalActive: true,
          infoModalText: 'Delete Failed',
          infoModalColor: 'red',
        })
      );
      console.log(error);
    }
  };

  const saveChangesHandler = async () => {
    const userChanges = {
      editMealName: editMealName.current.value,
      mealPricesValues: {
        xl: editMealPricesXl.current.value,
        md: editMealPricesMd.current.value,
        sm: editMealPricesSm.current.value,
      },
      editMealIngredients: editMealIngredients.current.value.split(','),
      uploadImageUrl: selectedMeal.uploadImageUrl,
      mealId: selectedMeal.id,
    };
    try {
      await setDoc(
        doc(db, 'Meals', selectedMeal.id),
        {
          mealName: userChanges.editMealName,
          mealIngredients: userChanges.editMealIngredients,
          mealPrices: userChanges.mealPricesValues,
          uploadImageUrl: userChanges.uploadImageUrl,
        },
        { merge: true }
      );
      props.onFinishEditing(true);
      dispatch(
        uiControllerActions.setInfoModal({
          infoModalActive: true,
          infoModalText: 'Product Updated Successfully',
          infoModalColor: 'green',
        })
      );
    } catch (error) {
      dispatch(
        uiControllerActions.setInfoModal({
          infoModalActive: true,
          infoModalText: 'Product Update Failed',
          infoModalColor: 'red',
        })
      );
    }
  };

  useEffect(() => {
    selectedMeal.mealIngredients.forEach((ing) => {
      setIngredientsList((prevState) => prevState + ing);
    });
    setIngredientsList((prevState) => prevState.replaceAll(' ', ', '));
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className="flex flex-row">
        <div className="flex  justify-center items-center h-32 w-32 m-auto border bg-white rounded-xl mb-2">
          <img
            className="object-contain h-32 p-4"
            src={selectedMeal.uploadImageUrl}
            alt="Meal"
          />
        </div>
        <div className="flex-1 flex-grow ml-4">
          <input
            ref={editMealName}
            className="p-4 border shadow-sm w-full rounded-xl"
            defaultValue={selectedMeal.mealName}
          ></input>
          <input
            ref={editMealIngredients}
            className="mt-2 p-4 border shadow-sm w-full rounded-xl"
            defaultValue={ingredientsList}
          ></input>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row  justify-start items-center">
          <div className="border font-semibold border-gray-200 w-20 h-12 bg-gray-50 mt-2 rounded-lg justify-center items-center text-center flex">
            <span className="">Large</span>
          </div>
          <input
            ref={editMealPricesXl}
            defaultValue={selectedMeal.mealPrices.xl}
            className="border h-12 flex flex-grow rounded-md p-4 mt-2 ml-2"
          ></input>
        </div>
        <div className="flex flex-row  justify-start items-center">
          <div className="border font-semibold border-gray-200 w-20 h-12 bg-gray-50 mt-2 rounded-lg justify-center items-center text-center flex">
            <span className="">Medium</span>
          </div>
          <input
            ref={editMealPricesMd}
            defaultValue={selectedMeal.mealPrices.md}
            className="border h-12 flex flex-grow rounded-md p-4 mt-2 ml-2"
          ></input>
        </div>
        <div className="flex flex-row  justify-start items-center">
          <div className="border font-semibold border-gray-200 w-20 h-12 bg-gray-50 mt-2 rounded-lg justify-center items-center text-center flex">
            <span className="">Small</span>
          </div>
          <input
            ref={editMealPricesSm}
            defaultValue={selectedMeal.mealPrices.sm}
            className="border h-12 flex flex-grow rounded-md p-4 mt-2 ml-2"
          ></input>
        </div>
        <div className="flex flex-row justify-around mt-4 align-middle items-center">
          <button
            className="bg-rose-500 w-1/2 m-2 text-white font-semibold rounded-xl hover:bg-rose-600"
            onClick={() => {
              if (formUploading) return;
            }}
          >
            {formUploading ? (
              <Loading margin={8} />
            ) : (
              <div onClick={deleteProductHandler} className="p-4">
                Delete Product
              </div>
            )}
          </button>
          <button
            className="bg-green-500 w-1/2 m-2 text-white font-semibold rounded-xl hover:bg-green-600"
            onClick={() => {
              if (formUploading) return;
            }}
          >
            {formUploading ? (
              <Loading margin={8} />
            ) : (
              <div onClick={saveChangesHandler} className="p-4">
                Save
              </div>
            )}
          </button>
        </div>
        <span
          onClick={() => props.onFinishEditing(false)}
          className="font-medium w-full text-center mt-4 cursor-pointer hover:text-gray-600"
        >
        Cancel
        </span>
      </div>
    </div>
  );
};

export default EditMeal;
