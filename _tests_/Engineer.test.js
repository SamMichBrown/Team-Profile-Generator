const Engineer = require('../lib/Engineer');

test('creates a character object', () => {
  
    const engineer = new Engineer('Sam')
  
  expect(engineer.name).toEqual(expect.any(String))
  
});

test('getGithub() returns github', () => {
    const engineer = new Engineer('Dave', 123, 'sam@hotmail.com', 'SamMBrown')
    expect(engineer.getGithub()).toEqual('SamMBrown')
})

test('getRole() returns Engineer', () => {
    const engineer = new Engineer('Dave', 123, 'sam@hotmail.com')
    expect(engineer.getRole()).toEqual('Engineer')
})