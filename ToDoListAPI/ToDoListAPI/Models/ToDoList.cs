﻿namespace ToDoListAPI.Models
{
    public class ToDoList
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public bool IsCompleted { get; set; }
    }
}
