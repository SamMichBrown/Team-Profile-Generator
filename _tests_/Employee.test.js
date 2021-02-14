const Employee = require('../lib/Employee');


test('creates a character object', () => {
  
    const employee = new Employee('Sam')
  
  expect(employee.name).toEqual(expect.any(String))
  
});

test('getName() returns employee name', () =>{
    const employee = new Employee('Jim')
    expect(employee.getName()).toEqual('Jim')
})

test('getId() returns employee id', () => {
    const employee = new Employee('Dave', 123)
    expect(employee.getId()).toEqual(123)
})

test('getEmail() returns employee email', () => {
    const employee = new Employee('Dave', 123, 'sam@hotmail.com')
    expect(employee.getEmail()).toEqual('sam@hotmail.com')
})

test('getRole() returns Employee', () => {
    const employee = new Employee('Dave', 123, 'sam@hotmail.com')
    expect(employee.getRole()).toEqual('Employee')
})

