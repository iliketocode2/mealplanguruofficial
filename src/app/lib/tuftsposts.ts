import { Post, DatabasePost } from './types'

export const posts: Record<string, Post> = {
'post-1': {
      title: 'How to use all of your meal swipes',
      date: '12/16/2024',
      content: [
        'Meal swipes are a valuable resource for any college student.',
        'This guide will help you maximize their use before the semester ends.',
      ],
      author: 'William Goldman',
      imageUrl: '/images/tufts_dining.jpg',
      tags: ['Guide'],
      viewCount: 0,
    },
    'post-2': {
      title: 'The best places to eat on campus',
      date: '12/15/2024',
      content: [
        'Review of the best places to eat on campus',
      ],
      author: 'Elliot Smith',
        imageUrl: '/images/tufts_dining.jpg',
        tags: ['Review'],
        viewCount: 0,
    },
    'post-3': {
      title: 'Another banger review',
      date: '12/13/2024',
      content: [
        'Review of something else',
      ],
      author: 'Elliot Smith',
        imageUrl: '/images/tufts_dining.jpg',
        tags: ['100', 'Review'],
        viewCount: 0,
    },
    'post-4': {
      title: 'News article',
      date: '12/17/2024',
      content: [
        'Dewick is terrible!!',
      ],
      author: 'Priya Shah',
        imageUrl: '/images/tufts_dining.jpg',
        tags: ['400', 'News'],
        viewCount: 0,
    },
    'post-5': {
      title: 'Exploring Tufts University Meal Plan Options',
      date: '12/20/2024',
      content: [
        `Tufts University offers a variety of meal plans to suit the diverse needs of its student body. These plans are designed to provide convenience, flexibility, and affordability, ensuring students can focus on their studies without worrying about daily meals. Here's an overview of the meal plan options available:`,

`Unlimited Plan`,
`The Unlimited Plan is perfect for students who want unrestricted access to dining halls. This plan allows students to enjoy as many meals as they wish throughout the semester, with no cap on entries. It also includes $75 in JumboCash, which can be used at campus cafés, vending machines, and participating off-campus locations.

19 Meals Per Week Plan
For students who have a structured eating schedule, the 19 Meals Per Week Plan provides nearly full coverage, including three meals on weekdays and two on weekends. This plan also comes with $75 in JumboCash for additional flexibility.

160 Plan
The 160 Plan is a popular choice for students who prefer a more flexible option. It includes 160 meals to be used throughout the semester, along with $150 in JumboCash. This plan is ideal for students who eat fewer meals on campus but still want access to dining halls and other food outlets.

80 Plan
Designed for upperclassmen and graduate students who cook at home or eat out frequently, the 80 Plan includes 80 meals per semester and $75 in JumboCash. It’s a great option for students with lighter on-campus dining needs.

10 Meals Per Week Plan
This plan offers 10 meals per week, catering to students with more predictable dining habits who might want a smaller, consistent meal allowance. It also includes $75 in JumboCash for additional purchases.

Special Features Across Plans
Flexibility: All meal plans include JumboCash, adding spending flexibility across various campus and local dining options.
Guest Meals: Many plans come with a set number of guest meal swipes, making it easy to treat friends and family.
Dietary Needs: Tufts Dining accommodates dietary restrictions and preferences with various allergen-friendly and vegetarian options.
With these thoughtfully designed meal plans, Tufts University ensures every student can find an option that aligns with their lifestyle and dining habits.`,
      ],
      author: 'William Goldman',
        imageUrl: '/images/tufts_dining.jpg',
        tags: ['Review'],
        viewCount: 0,
    },
    'post-6': {
      title: 'Why the 160 Plan is the Best Meal Plan at Tufts',
      date: '12/21/2024',
      content: [
      `Among the diverse meal plan options Tufts University offers, the 160 Plan stands out as the best choice for most students. It strikes the perfect balance between cost-effectiveness, flexibility, and practicality, making it a top contender for budget-conscious and savvy eaters alike.

Cost Efficiency
One of the most significant advantages of the 160 Plan is its affordability. With 160 meals per semester, students effectively have about 10 meals per week, which aligns well with the typical dining habits of many college students. Coupled with $150 in JumboCash, this plan ensures that every dollar goes further compared to more rigid or unlimited plans.

Flexibility and Customization
The 160 Plan’s structure allows students to tailor their dining experience. Not every student eats three meals a day on campus—many skip breakfast, grab a coffee, or eat out with friends. The 160 Plan accommodates these habits without forcing students to overpay for meals they might never use.

JumboCash adds another layer of flexibility, enabling students to purchase snacks, coffee, or even meals from participating off-campus eateries. It’s perfect for students who value variety in their dining options.

Adequate Meal Coverage
For students who balance their diet between on-campus dining and off-campus meals, 160 swipes per semester provide just the right amount of access to Tufts dining halls. Whether it's a quick lunch between classes or a hearty dinner after a long day, this plan ensures students can meet their needs without wasting meal swipes.

Ideal for Social and Academic Lifestyles
The 160 Plan also accounts for the unpredictable nature of student life. With enough meals to cover busy weeks and the added convenience of JumboCash for spontaneous snack runs, this plan fits seamlessly into the dynamic schedules of Tufts students.

In conclusion, the 160 Plan offers the best value for money, adaptability, and practicality among Tufts meal plans. It recognizes that not all students eat the same way and provides the right mix of resources to cater to diverse lifestyles. For those seeking an efficient, budget-friendly, and versatile dining solution, the 160 Plan is an unbeatable choice.`,
      ],
      author: 'Priya Shah',
        imageUrl: '/images/tufts_dining.jpg',
        tags: ['160', 'Opinion'],
        viewCount: 0,
    },
}

export async function syncPostsWithDatabase() {
    try {
      const response = await fetch(`${process.env.DATABASE_URL}/api/tufts/posts`)
      const existingPosts: DatabasePost[] = await response.json()
      const existingPostIds = new Set(existingPosts.map(post => post.id))
  
      const updates = Object.entries(posts)
        .filter(([postId]) => !existingPostIds.has(postId))
        .map(([postId, post]) => 
          fetch(`${process.env.DATABASE_URL}/api/tufts/posts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: postId, ...post }),
          })
        )
  
      await Promise.all(updates)
    } catch (err) {
      console.error('Error syncing posts:', err)
    }
  }