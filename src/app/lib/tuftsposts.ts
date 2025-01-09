import { Post, DatabasePost } from './types'

export const posts: Record<string, Post> = {
'post-1': {
      title: 'How to use all of your meal swipes',
      date: '1/4/2025',
      content: [
        `As a Tufts student, your meal plan is packed with opportunities to fuel your day—and there’s more to it than just dining hall meals! Here are some tips to help you get the most out of it:`,
`1. Dining Halls`,
`Carmichael and Dewick are staples for all-you-care-to-eat dining. Start your day with a hearty breakfast, and take advantage of customizable options like the salad bar, stir-fry stations, and desserts. If you have a late-night craving, Hodgdon (aka “Hodge”) is a retail location but offers great pre-packaged meals that count as a meal swipe!`,

`2. Mobile Order App`,
`The Tufts Dining Mobile Order App is a lifesaver for busy days. Use it to grab meals on the go at popular spots like Hotung Café or Commons Marketplace. Pro tip: Plan ahead during peak hours to avoid waiting for your order.`,

`3. Snacks & Coffee`,
`Don’t forget your JumboCash! Use it to grab snacks, drinks, and coffee at retail locations like The Rez or Tower Café. These spots are perfect for study breaks.`,

`By combining dining hall meals, mobile orders, and retail options, you’ll not only stay well-fed but also maximize every swipe and dollar on your plan. Bon appétit, Jumbos!`
      ],
      author: 'William Goldman',
      imageUrl: '/food_images/hodge_snacks.jpg',
      tags: ['Guide'],
      viewCount: 0,
    },
    'post-2': {
      title: 'Freshman Guide: Making the Most of Your 400-Swipe Meal Plan',
      date: '1/3/2025',
      content: [
        `Welcome to Tufts! If you’re starting your first year with the full 400-swipe meal plan, you’ve got plenty of opportunities to enjoy everything Tufts Dining has to offer. Here’s how to navigate your swipes and make the most of your plan.`,

`1. Don’t Stress About Using All 400 Swipes`,
`It’s nearly impossible to use every swipe by the end of the semester, and that’s okay! With so many swipes, you’ll have more than enough for regular meals and some extras, so focus on eating what you need rather than racing to use them all.`,

`2. Make Dining Halls Your Go-To`,
`Carmichael and Dewick are the best places to get the most value from your swipes. Whether it’s breakfast, lunch, or dinner, take advantage of the unlimited options and grab some fruit or packaged snacks on your way out for later.`,

`3. Use Swipes at Retail Locations`,
`You can use swipes at places like Hodgdon, Hotung, or Commons Marketplace for snacks, drinks, or grab-and-go meals. It’s a great way to stock up on quick snacks for late-night studying or busy days.`,

`4. Plan Ahead for Finals`,
`As the semester winds down, save some swipes for finals week. Retail locations are perfect for grabbing energy bars, coffee, or study snacks to keep you going.`,

`With a little planning, your meal plan can fuel your semester without any stress. Enjoy exploring all the dining options Tufts has to offer!`
      ],
      author: 'William Goldman',
        imageUrl: '/food_images/hodge_bowls.jpg',
        tags: ['Guide', '400'],
        viewCount: 0,
    },
    'post-3': {
      title: 'Does Extending Dining Hall Hours Benefit All?',
      date: '12/13/2024',
      content: [
        `Tufts students have long debated the need to keep dining halls open longer, and the argument is more relevant than ever. With packed schedules, evening classes, and extracurricular commitments, the current hours at Carmichael and Dewick fail to meet the diverse needs of the student body. Extending dining hall hours could provide critical support for students juggling academics, jobs, and campus involvement.`,

`A common argument in favor of longer hours is that students with late-night study sessions or work shifts are often left scrambling for food options. While Hodgdon is open late, its limited offerings and higher prices don’t meet the same needs as a full dining hall. A modest extension of dining hall hours would offer better options and help reduce food insecurity among students who rely on meal plans.`,

`However, one perspective that’s often overlooked is the impact on dining staff. Many employees already work long shifts, and longer hours could place additional strain on them. To address this, Tufts should consider rotating shifts or hiring additional staff to cover extended hours.`,

`Ultimately, keeping dining halls open longer is a step toward inclusivity. By prioritizing the well-being of both students and staff, Tufts can create a solution that benefits the entire community.`
      ],
      author: 'William Goldman',
        imageUrl: '/food_images/dewick_empty.jpg',
        tags: ['Opinion'],
        viewCount: 0,
    },
    'post-4': {
      title: 'Tufts Pop-Up Pub Faces Criticism',
      date: '12/17/2024',
      content: [
        `While Tufts Dining’s new pop-up pub at the Hotung Café was introduced as a place for students, faculty, and staff to relax and connect, not everyone is impressed. According to some students, the pub is overpriced and falls short of creating a fun or welcoming atmosphere.`,

`Open Thursdays from 5 p.m. to 9 p.m., the pub offers a menu of beer, wine, non-alcoholic drinks, and pub-style snacks like sliders and pretzels. However, students have expressed frustration with the high prices, saying the cost doesn’t match the quality or quantity of the food and drinks.`,

`“I thought it would be a great place to hang out, but it felt more like a cash grab than a community space,” one student shared. Others noted that the atmosphere lacked energy, with sparse attendance and limited entertainment options making it less appealing as a social hub.`,

`While the concept of a campus pub is promising, students are calling for changes—like more affordable pricing and a livelier environment—to make it a place worth visiting. For now, many seem to prefer more established off-campus venues over this new addition to Tufts.`
      ],
      author: 'William Goldman',
        imageUrl: '/food_images/pub_people.jpg',
        tags: ['News'],
        viewCount: 0,
    },
    'post-5': {
      title: 'Exploring Tufts University Meal Plan Options',
      date: '1/8/2025',
      content: [
        `Tufts University offers a variety of meal plans to suit the diverse needs of its student body. These plans are designed to provide convenience, flexibility, and affordability, ensuring students can focus on their studies without worrying about daily meals. Here's an overview of the meal plan options available:`,

`Unlimited Plan`,
`The Unlimited Plan is perfect for students who want unrestricted access to dining halls. This plan allows students to enjoy as many meals as they wish throughout the semester, with no cap on entries. It also includes $75 in JumboCash, which can be used at campus cafés, vending machines, and participating off-campus locations.`,

`19 Meals Per Week Plan`,
`For students who have a structured eating schedule, the 19 Meals Per Week Plan provides nearly full coverage, including three meals on weekdays and two on weekends. This plan also comes with $75 in JumboCash for additional flexibility.`,

`160 Plan`,
`The 160 Plan is a popular choice for students who prefer a more flexible option. It includes 160 meals to be used throughout the semester, along with $150 in JumboCash. This plan is ideal for students who eat fewer meals on campus but still want access to dining halls and other food outlets.`,

`80 Plan`,
`Designed for upperclassmen and graduate students who cook at home or eat out frequently, the 80 Plan includes 80 meals per semester and $75 in JumboCash. It’s a great option for students with lighter on-campus dining needs.`,

`10 Meals Per Week Plan`,
`This plan offers 10 meals per week, catering to students with more predictable dining habits who might want a smaller, consistent meal allowance. It also includes $75 in JumboCash for additional purchases.`,

`Special Features Across Plans`,
`Flexibility: All meal plans include JumboCash, adding spending flexibility across various campus and local dining options.
Guest Meals: Many plans come with a set number of guest meal swipes, making it easy to treat friends and family.
Dietary Needs: Tufts Dining accommodates dietary restrictions and preferences with various allergen-friendly and vegetarian options.
With these thoughtfully designed meal plans, Tufts University ensures every student can find an option that aligns with their lifestyle and dining habits.`,
      ],
      author: 'William Goldman',
        imageUrl: '/food_images/dewick_kosher_line.jpg',
        tags: ['Review', '400', '220', '160', '100', '40'],
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
      author: 'William Goldman',
        imageUrl: '/food_images/kindlevan_sushi.jpg',
        tags: ['Opinion', '160'],
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