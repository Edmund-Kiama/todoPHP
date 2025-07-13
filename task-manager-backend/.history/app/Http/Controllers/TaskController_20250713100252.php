<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    // Get all tasks (admin)
    public function index()
    {
        return Task::with('user')->get();
    }

    // Store a new task (admin assigns to user)
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'deadline' => 'required|date',
            'user_id' => 'required|exists:users,id',
            'status' => 'in:Pending,In Progress,Completed'
        ]);

        $task = Task::create($request->all());
        return response()->json($task, 201);
    }

    // Update a task (e.g. status or deadline)
    public function update(Request $request, Task $task)
    {
        $task->update($request->only(['status', 'deadline', 'title']));
        return response()->json($task);
    }

    // Get tasks for a specific user
    public function userTasks($userId)
    {
        return Task::where('user_id', $userId)->get();
    }
}
