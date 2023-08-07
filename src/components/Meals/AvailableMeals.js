import classes from './AvailableMeals.module.css'
import MealItem from './MealItem';
import Card from '../UI/Card';
import { useEffect, useState } from 'react';


const AvailableMelas = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [httpError, setHttpError] = useState(null);

    useEffect(() => {

        const fetchMeals = async () => {
            setIsLoading(true);
            const response = await fetch('https://food-app-api-e5adb-default-rtdb.firebaseio.com/meals.json');
            const mealsData = await response.json();
            if (!response.ok) {
                throw new Error('Failed to fetch')

            }

            const loadedMeals = [];
            for (let key in mealsData) {
                loadedMeals.push({
                    id: key,
                    name: mealsData[key].name,
                    description: mealsData[key].description,
                    price: mealsData[key].price,

                });
            }

            setMeals(loadedMeals);
            setIsLoading(false);



        }
        fetchMeals().catch((error) => {
            setIsLoading(false)
           
            setHttpError(error.message)

        });

    }, []);
    const Meals = meals.map((meal) => <MealItem key={meal.id} id={meal.id} name={meal.name} desc={meal.description} price={meal.price} />

    )
    return (
        <section className={classes.meals}>
            <Card>
                {isLoading && <p className={classes.MealsLoading}>Loading...</p>}
                {!isLoading && <ul>{Meals}</ul>}
                {!isLoading && httpError && <p className={classes.MealsError}> {httpError}</p> }
            </Card>

        </section>

    );
}

export default AvailableMelas;