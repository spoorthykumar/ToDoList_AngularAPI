using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using System.Runtime.InteropServices;
using ToDoListAPI.Data;
using ToDoListAPI.Models;

namespace ToDoListAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToDoController : Controller
    {
        private readonly ToDoData _toDoData;
        private static List<ToDoList> todoItems = new List<ToDoList>();
        private static int nextId = 1;

        public ToDoController(ToDoData toDoData)
        {
            _toDoData = toDoData;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var todos = await _toDoData.ToDos.ToListAsync();
            return Ok(todos);
        }

        [HttpPost]
        public async Task<IActionResult> Post(ToDoList item)
        {
            item.Id = nextId++;
            _toDoData.ToDos.Add(item);
            await _toDoData.SaveChangesAsync();
            return Ok(item);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateToDo(int id, ToDoList toDoItem)
        {
            var todo = await _toDoData.ToDos.FindAsync(id);
            if (todo == null)
                return NotFound();
            todo.IsCompleted = toDoItem.IsCompleted;
            await _toDoData.SaveChangesAsync();
            return Ok(todo);
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var itemToRemove = await _toDoData.ToDos.FindAsync(id);
            if (itemToRemove == null)
                return NotFound();
            
            _toDoData.ToDos.Remove(itemToRemove);
            await _toDoData.SaveChangesAsync();

            return Ok(itemToRemove);
        }       
    }
}
