'use client';
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plan } from '@/app/lib/types';

const MealPlanCalculator = ({ plans }: { plans: Plan[] }) => {
  const [year, setYear] = useState('');
  const [mealsPerDay, setMealsPerDay] = useState(2);
  const [wantsSnacks, setWantsSnacks] = useState(false);
  const [eatingOut, setEatingOut] = useState(2); // Scale of 1-4

  // Helper function to extract swipes from details string
  const extractSwipes = (details: string): number => {
    const match = details.match(/(\d+)\s+swipes/);
    return match ? parseInt(match[1]) : 0;
  };

  // Helper function to extract JumboCash from details string
  const extractJumboCash = (details: string): number => {
    const match = details.match(/\$(\d+)\s+Jumbo Cash/);
    return match ? parseInt(match[1]) : 0;
  };

  // Helper function to convert price string to number
  const priceToNumber = (price: string): number => {
    return parseInt(price.replace(/[$,]/g, ''));
  };

  const calculatePricePerMeal = (plan: Plan) => {
    const numericPrice = priceToNumber(plan.price);
    const swipes = extractSwipes(plan.details);
    const jumboCash = extractJumboCash(plan.details);
    const effectivePrice = numericPrice - jumboCash;
    return (effectivePrice / swipes).toFixed(2);
  };

  const getSuggestedPlans = () => {
    let availablePlans = [...plans];
    
    // Filter based on year restrictions
    if (year === 'freshman') {
      availablePlans = availablePlans.filter(plan => plan.tag === '400');
    } else if (year === 'sophomore') {
      availablePlans = availablePlans.filter(plan => ['400', '220'].includes(plan.tag));
    }

    // Calculate expected semester meals
    const daysInSemester = 115; // Approximate
    const expectedMeals = daysInSemester * mealsPerDay * (1 - (eatingOut - 1) * 0.2);
    
    // Adjust for snacks preference
    const adjustedMeals = wantsSnacks ? expectedMeals * 1.3 : expectedMeals;

    // Score each plan
    return availablePlans.map(plan => {
      const swipes = extractSwipes(plan.details);
      const score = Math.abs(swipes - adjustedMeals);
      const pricePerMeal = calculatePricePerMeal(plan);
      return { ...plan, score, pricePerMeal, swipes };
    }).sort((a, b) => a.score - b.score);
  };

  const suggestedPlans = getSuggestedPlans();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Meal Plan Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">What year are you?</label>
            <Select onValueChange={setYear} value={year}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="freshman">Freshman</SelectItem>
                <SelectItem value="sophomore">Sophomore</SelectItem>
                <SelectItem value="junior">Junior</SelectItem>
                <SelectItem value="senior">Senior</SelectItem>
                <SelectItem value="grad">Graduate Student</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium">How many meals do you typically eat per day?</label>
            <div className="pt-2">
              <Slider
                value={[mealsPerDay]}
                onValueChange={([value]) => setMealsPerDay(value)}
                min={1} 
                max={5}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5+</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Do you like having extra snacks?</label>
            <Switch
              checked={wantsSnacks}
              onCheckedChange={setWantsSnacks}
            />
          </div>

          <div>
            <label className="text-sm font-medium">How often do you plan to eat off campus?</label>
            <div className="pt-2">
              <Slider
                value={[eatingOut]}
                onValueChange={([value]) => setEatingOut(value)}
                min={1}
                max={4}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>Rarely</span>
                <span>Sometimes</span>
                <span>Often</span>
                <span>Very Often</span>
              </div>
            </div>
          </div>
        </div>

        {year && (
          <div className="space-y-4 pt-4">
            <h3 className="font-medium text-lg">Recommended Plans</h3>
            
            {year === 'freshman' && (
              <Alert>
                <AlertDescription>
                  As a freshman, you are required to have the Full Meal Plan (400 swipes).
                </AlertDescription>
              </Alert>
            )}
            
            {year === 'sophomore' && (
              <Alert>
                <AlertDescription>
                  As a sophomore, you must choose either the Full Plan (400 swipes) or 220 Plan.
                </AlertDescription>
              </Alert>
            )}

            <div className="grid gap-4">
              {suggestedPlans.map((plan, index) => (
                <div 
                  key={plan.name}
                  className="p-4 rounded-lg border bg-white"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-lg">
                        {index === 0 && '👑 '}{plan.name}
                      </h4>
                      <p className="text-sm text-gray-600">{plan.details}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{plan.price}</p>
                      <p className="text-sm text-gray-600">
                        ${plan.pricePerMeal} per meal
                      </p>
                    </div>
                  </div>
                  {extractJumboCash(plan.details) > 0 && (
                    <p className="text-sm text-green-600 mt-2">
                      Includes ${extractJumboCash(plan.details)} JumboCash
                    </p>
                  )}
                  {index === 0 && (
                    <p className="text-sm text-blue-600 mt-2">
                      Best match for your eating habits
                    </p>
                  )}
                  <p className="text-sm text-gray-600 mt-2">
                    {plan.extra}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-2">
              <h3 className="font-medium text-lg">Tips</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                <li>Guest swipes can be used for visiting friends and family</li>
                <li>JumboCash can be used at retail dining locations and local restaurants. It can also be used at the bookstore!</li>
                {mealsPerDay >= 3 && (
                  <li>With {mealsPerDay} meals per day, you might want to consider the Full Plan for the most value per meal</li>
                )}
                {eatingOut >= 3 && (
                  <li>Since you plan to eat off campus often, you might save money with a smaller meal plan</li>
                )}
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MealPlanCalculator;