<?php

namespace App\Http\Controllers;

use \App\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function store(Request $request) {
        $validatedData = $request->validate(['title' => 'required|max:255']);

        $task = Task::create([
          'title' => $validatedData['title'],
          'project_id' => $request->project_id,
        ]);

        return $task->toJson();
    }

    public function markCompleted(Task $task) {
        $task->is_completed = true;
        $task->update();

        return response()->json(['message' => 'Task completed', 'task' => $task], 201);
    }
}
