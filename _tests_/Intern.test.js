const Intern = require('../lib/Intern');

test('creates a character object', () => {
  
    const intern = new Intern('Sam')
 
  expect(intern.name).toEqual(expect.any(String))
  
});

test('getSchool() returns school', () => {
    const intern = new Intern('Dave', 123, 'sam@hotmail.com', 'U of T')
    expect(intern.getRole()).toEqual('Intern')
})

test('getRole() returns Intern', () => {
    const intern = new Intern('Dave', 123, 'sam@hotmail.com')
    expect(intern.getRole()).toEqual('Intern')
})