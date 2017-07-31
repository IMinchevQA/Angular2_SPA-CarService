module.exports = {
  all: (page) => {
    const pageSize = 3
    let startIndex = (page - 1) * pageSize
    let endIndex = startIndex + pageSize
    return Object
      .keys(owners)
      .map(key => owners[key])
      .sort((a, b) => b.id - a.id)
      .slice(startIndex, endIndex)
  },
  findById: (id) => {
    return owners.find(car => car.id === id)
  }
}
const owners = [
  {
    id: 1,
    date: Date.now() + 1,
    name: 'Bruce-Lee',
    image: 'http://blog.ivodimitrov.pro/wp-content/uploads/2013/11/Bruce-Lee-9542095-3-402.jpg'
  },
  {
    id: 2,
    date: Date.now() + 2,
    name: 'Bruce Wayne',
    image: 'https://static.comicvine.com/uploads/original/11116/111164870/3856659-7828899285-Bruce.jpg'
  },
  {
    id: 3,
    date: Date.now() + 3,
    name: 'Maria',
    image: 'https://pbs.twimg.com/profile_images/573600918144319488/Dz_wK2rW.jpeg'
  },
  {
    id: 4,
    date: Date.now() + 4,
    name: 'Bruce Wayne',
    image: 'http://theatre.art.bg/img/photos/BIG135342468611645_100277866664926_725668_n.jpg'
  },
  {
    id: 5,
    date: Date.now() + 5,
    name: 'Arnold Schwarzenegger',
    image: 'https://photo-forum.net/static/site_pics/2005-07/6_1121420848.jpg'
  },
  {
    id: 6,
    date: Date.now() + 6,
    name: 'Al Bundy',
    image: 'http://darktales.blog.bg/photos/32685/original/ab_cc_ed.jpg'
  },
  {
    id: 7,
    date: Date.now() + 7,
    name: 'Sylvester Stallone',
    image: 'http://i.dailymail.co.uk/i/pix/2009/09/12/article-1213005-0665A5C1000005DC-652_468x664.jpg'
  },
  {
    id: 8,
    date: Date.now() + 8,
    name: 'Robert de niro',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZHhW9WjDAlYtE21p6t4oRPQ0SqZ0pYHAclpWogbIX11RLL8rs'
  },
  {
    id: 9,
    date: Date.now() + 9,
    name: 'Robert de niro',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZHhW9WjDAlYtE21p6t4oRPQ0SqZ0pYHAclpWogbIX11RLL8rs'
  },
  {
    id: 10,
    date: Date.now() + 10,
    name: 'Al Bundy',
    image: 'http://darktales.blog.bg/photos/32685/original/ab_cc_ed.jpg'
  },
  {
    id: 11,
    date: Date.now() + 11,
    name: 'Robert de niro',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZHhW9WjDAlYtE21p6t4oRPQ0SqZ0pYHAclpWogbIX11RLL8rs'
  }
]
