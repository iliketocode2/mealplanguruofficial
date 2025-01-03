'use client';
import Image from 'next/image';
import Link from 'next/link';

// You can create a CSS module for custom styles
// src/app/school/school.module.css
const styles = `
.schools-container {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  padding: 2rem;
}

.school-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s;
}

.school-link:hover {
  transform: scale(1.05);
}

.school-circle {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.coming-soon {
  opacity: 0.7;
  cursor: not-allowed;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
}

#active {
  border: 3px solid #3b82f6;
}
`;

export default function School() {
  return (
    <>
      <style jsx>{styles}</style>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Find Your School</h1>
        
        <div className="schools-container">
          <Link href="/tufts" className="school-link">
            <div className="school-circle" id="active">
              <Image
                src="/images/tufts.png"
                alt="Tufts University"
                width={200}
                height={200}
                priority
                style={{
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                }}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..."
              />
            </div>
            <span className="mt-2 text-lg font-medium">Tufts</span>
          </Link>

          <div className="school-link coming-soon">
            <div className="school-circle">
              <Image
                src="/images/harvard.png"
                alt="Harvard University"
                width={200}
                height={200}
                style={{
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                }}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..."
              />
              <div className="overlay">
                <span>Coming Soon</span>
              </div>
            </div>
            <span className="mt-2 text-lg font-medium">Harvard</span>
          </div>

          <div className="school-link coming-soon">
            <div className="school-circle">
              <Image
                src="/images/bu.jpg"
                alt="Boston University"
                width={200}
                height={200}
                style={{
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                }}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..."
              />
              <div className="overlay">
                <span>Coming Soon</span>
              </div>
            </div>
            <span className="mt-2 text-lg font-medium">Boston University</span>
          </div>
        </div>
      </div>
    </>
  );
}