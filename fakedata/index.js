const Axios = require('axios');
const Faker = require('faker');

const IDEA_GENERATOR = 'http://appideagenerator.com/call.php';
const IDEA_API = 'http://localhost:4000';

const randomInt = () => Math.floor(Math.random() * 10);

const generateIdea = async() => {
  const {data} = await Axios.get(IDEA_GENERATOR);
  return data.replace(/\n/g, '');
}

const generateUser = async() => {
  const {data} = await Axios.post(`${IDEA_API}/register`,
  {
    username: Faker.internet.userName(),
    password: 'password'
  });
  return data.token;
}

const postNewIdea = async token => {
  const idea = await generateIdea();
  const {data} = await Axios.post(`${IDEA_API}/api/idea`,
  {
    idea,
    description: Faker.lorem.paragraph()
  }, {
    headers: {authorization: `Bearer ${token}`}
  });

  // console.log(data);
  return idea;
}

(async() => {
  const ranUserNum = randomInt();
  const ranIdeaNum = randomInt();
  for (let i = 0; i < ranUserNum; i++) {
    const token = await generateUser();
    for (let j = 0; j < ranIdeaNum; j++) {
      const idea = await postNewIdea(token);
    }
  }
})();
