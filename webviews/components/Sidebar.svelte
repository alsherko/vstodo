<script lang="ts">
import { each } from "svelte/internal";
    let todos: Array<{text: string, completed: boolean}>  = []
    let text = ""
</script>

<style>
    .complete {
        text-decoration: line-through;
    }
</style>

<form on:submit|preventDefault={e => {
   todos = [{text, completed: false},...todos];
   text = '';
}}>
    <input bind:value={text}/>
</form>

<pre>
    {JSON.stringify(todos, null, 2)}
</pre>

<ul>
    {#each todos as todo (todo.text)}
        <li 
            class:complete={todo.completed} 
            on:click={() => {
                todo.completed = !todo.completed;
        }}>
            {todo.text}
        </li>
    {/each}
</ul>