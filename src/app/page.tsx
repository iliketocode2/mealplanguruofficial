import Image from 'next/image'
import Link from 'next/link'
 
// import '@/styles/Home.css'

export default function Home() {
  return (
    <div className="home-page">
      <div className="banner">
        <h1>Meal Plan Guru</h1>
      </div>
      <div className="home-container">
        <div className="content-section">
          <div className="text-section">
            <h1>Bringing a student&apos;s perspective to meal planning</h1>
            <p>
              Meal Plan Guru is a website that helps students find the best meal
              plan for their needs at their school. Providing news, updates, reviews,
              and opinions about you meal plan and how best to use it.
              Written by students, for students.
            </p>
          </div>
          <div className="image-section">
            <Image 
              src="/images/tufts_dining.jpg" 
              alt="Tufts Dining"
              width={500}
              height={300}
              priority
            />
          </div>
        </div>
        <div className="button-section">
          <div className="button-box">
            <p>
              Start by finding your school:
            </p>
            <Link href="/school">
              <button>Find School</button>
            </Link>
          </div>
          <div className="button-box">
            <p>
              Learn more about our mission:
            </p>
            <Link href="/about">
              <button>About us</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}