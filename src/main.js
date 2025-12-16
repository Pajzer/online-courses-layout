document.addEventListener('DOMContentLoaded', () => {

    const coursesData = [
        {
            id: 1,
            category: 'Marketing',
            title: 'The Ultimate Google Ads Training Course',
            price: 100,
            author: 'Jerome Bell',
            tagColor: 'marketing',
            image: '/images/p1.jpg'
        },
        {
            id: 2,
            category: 'Management',
            title: 'Product Management Fundamentals',
            price: 480,
            author: 'Marvin McKinney',
            tagColor: 'management',
            image: '/images/p2.jpg'
        },
        {
            id: 3,
            category: 'HR & Recruiting',
            title: 'HR Management and Analytics',
            price: 200,
            author: 'Leslie Alexander Li',
            tagColor: 'hr',
            image: '/images/p3.jpg'
        },
        {
            id: 4,
            category: 'Marketing',
            title: 'Brand Management & PR Communications',
            price: 530,
            author: 'Kristin Watson',
            tagColor: 'marketing',
            image: '/images/p4.jpg'
        },
        {
            id: 5,
            category: 'Design',
            title: 'Graphic Design Basic',
            price: 500,
            author: 'Guy Hawkins',
            tagColor: 'design',
            image: '/images/p5.jpg'
        },
        {
            id: 6,
            category: 'Management',
            title: 'Business Development Management',
            price: 400,
            author: 'Dianne Russell',
            tagColor: 'management',
            image: '/images/p6.jpg'
        },
        {
            id: 7,
            category: 'Development',
            title: 'Highload Software Architecture',
            price: 600,
            author: 'Brooklyn Simmons',
            tagColor: 'development',
            image: '/images/p7.jpg'
        },
        {
            id: 8,
            category: 'HR & Recruiting',
            title: 'Human Resources – Selection and Recruitment',
            price: 150,
            author: 'Kathryn Murphy',
            tagColor: 'hr',
            image: '/images/p8.jpg'
        },
        {
            id: 9,
            category: 'Design',
            title: 'User Experience. Human-centered Design',
            price: 240,
            author: 'Cody Fisher',
            tagColor: 'design',
            image: '/images/p9.jpg'
        }
    ];

    const gridContainer = document.getElementById('courses-grid');
    const filterButtons = document.querySelectorAll('.filters__btn');
    const searchInput = document.getElementById('search-input');

    let currentCategory = 'all';
    let currentSearch = '';

    function renderCourses() {
        gridContainer.innerHTML = '';

        const filteredCourses = coursesData.filter(course => {
            const matchCategory = currentCategory === 'all' || course.category === currentCategory;
            const matchSearch = course.title.toLowerCase().includes(currentSearch.toLowerCase());
            return matchCategory && matchSearch;
        });

        if (filteredCourses.length === 0) {
            gridContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #777;">No courses found.</p>';
            return;
        }

        filteredCourses.forEach(course => {
            const card = document.createElement('article');
            card.className = 'card';
            
            let tagClass = 'card__tag--marketing';
            if(course.tagColor === 'management') tagClass = 'card__tag--management';
            if(course.tagColor === 'hr') tagClass = 'card__tag--hr';
            if(course.tagColor === 'design') tagClass = 'card__tag--design';
            if(course.tagColor === 'development') tagClass = 'card__tag--development';

            card.innerHTML = `
                <div class="card__header">
                    <img src="${course.image}" alt="${course.author}" class="card__image">
                </div>
                <div class="card__body">
                    <span class="card__tag ${tagClass}">${course.category}</span>
                    <h3 class="card__title">${course.title}</h3>
                    <div class="card__footer">
                        <span class="card__price">$${course.price}</span>
                        <span class="card__separator">|</span>
                        <span class="card__author">by ${course.author}</span>
                    </div>
                </div>
            `;
            gridContainer.appendChild(card);
        });
    }

    function updateCounts() {
        document.getElementById('count-all').textContent = coursesData.length;

        const categories = ['Marketing', 'Management', 'HR & Recruiting', 'Design', 'Development'];
        const mapIds = {
            'Marketing': 'count-marketing',
            'Management': 'count-management',
            'HR & Recruiting': 'count-hr',
            'Design': 'count-design',
            'Development': 'count-dev'
        };

        categories.forEach(cat => {
            const count = coursesData.filter(c => c.category === cat).length;
            const elementId = mapIds[cat];
            if(document.getElementById(elementId)) {
                document.getElementById(elementId).textContent = count;
            }
        });
    }

    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('filters__btn--active'));
            btn.classList.add('filters__btn--active');

            const category = btn.getAttribute('data-category');
            currentCategory = category === 'all' ? 'all' : category;
            
            renderCourses();
        });
    });

    searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value.trim();
        renderCourses();
    });

    updateCounts();
    renderCourses();
});