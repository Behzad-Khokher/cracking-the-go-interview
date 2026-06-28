export type Difficulty = "Easy" | "Medium" | "Hard";

export interface Question {
  slug: string;
  title: string;
  topic: string;
  difficulty: Difficulty;
  shortAnswer: string;
  answer: string;
  codeExample?: string;
  tags: string[];
}

export interface Topic {
  slug: string;
  name: string;
  description: string;
  icon: string;
}

export const topics: Topic[] = [
  { slug: "goroutines", name: "Goroutines & Concurrency", description: "Lightweight threads managed by the Go runtime", icon: "⚡" },
  { slug: "channels", name: "Channels", description: "Typed conduits for communication between goroutines", icon: "🔗" },
  { slug: "interfaces", name: "Interfaces & Embedding", description: "Go's implicit interface system and struct embedding", icon: "🧩" },
  { slug: "error-handling", name: "Error Handling", description: "Idiomatic error patterns in Go", icon: "🛡️" },
  { slug: "slices-maps", name: "Slices & Maps", description: "Go's core data structures", icon: "📦" },
  { slug: "memory", name: "Memory & GC", description: "Garbage collection and memory management", icon: "🧠" },
  { slug: "testing", name: "Testing", description: "Writing and running tests in Go", icon: "✅" },
  { slug: "generics", name: "Generics", description: "Type parameters introduced in Go 1.18", icon: "🔧" },
];

export const questions: Question[] = [
  {
    slug: "what-is-a-goroutine",
    title: "What is a goroutine and how does it differ from an OS thread?",
    topic: "goroutines",
    difficulty: "Easy",
    shortAnswer: "A goroutine is a lightweight, cooperatively-scheduled function managed by the Go runtime, starting at ~2KB stack vs. ~1MB for OS threads.",
    answer: `A goroutine is a function that runs concurrently with other functions in the same address space. Unlike OS threads, goroutines are extremely lightweight — they start with a small stack (around 2–8 KB) that grows and shrinks on demand, whereas OS threads typically reserve 1–8 MB upfront.

The Go runtime multiplexes goroutines onto a pool of OS threads using an M:N scheduler (the GOMAXPROCS model). This means you can run millions of goroutines on a modest machine without running out of memory or hitting OS thread limits.

Key differences:
- **Stack size**: Goroutines start small (~2–8 KB, growable); OS threads are large (~1–8 MB, fixed)
- **Scheduling**: Goroutines use cooperative + preemptive scheduling by the Go runtime; OS threads are scheduled by the kernel
- **Communication**: Goroutines communicate via channels (CSP model); threads share memory with locks
- **Cost**: Spawning a goroutine is very cheap (~1 µs); spawning a thread is expensive (~10 µs+)`,
    codeExample: `// Launching a goroutine is just the 'go' keyword
func main() {
    go func() {
        fmt.Println("running concurrently")
    }()

    // You can run millions of these
    var wg sync.WaitGroup
    for i := 0; i < 1_000_000; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            // do work
        }()
    }
    wg.Wait()
}`,
    tags: ["goroutines", "concurrency", "runtime", "scheduler"],
  },
  {
    slug: "how-do-channels-work",
    title: "How do channels work in Go, and what is the difference between buffered and unbuffered channels?",
    topic: "channels",
    difficulty: "Easy",
    shortAnswer: "Channels are typed pipes for goroutine communication. Unbuffered channels synchronize sender and receiver; buffered channels allow a fixed number of sends without a receiver ready.",
    answer: `Channels are the primary mechanism for goroutines to communicate and synchronize. They implement the CSP (Communicating Sequential Processes) model — "don't communicate by sharing memory; share memory by communicating."

**Unbuffered channels** block the sender until a receiver is ready (and vice versa). They guarantee synchronization at the point of exchange.

**Buffered channels** have a capacity. Sends don't block until the buffer is full; receives don't block until the buffer is empty. Use them when you want to decouple producer and consumer timing.

**Direction**: Channel parameters can be restricted to send-only (\`chan<- T\`) or receive-only (\`<-chan T\`) to enforce correct usage at compile time.

**Closing**: Only the sender should close a channel. Reading from a closed channel returns the zero value immediately. Use the two-value receive \`v, ok := <-ch\` to detect closure.`,
    codeExample: `// Unbuffered — sender blocks until receiver reads
ch := make(chan int)
go func() { ch <- 42 }()
val := <-ch // synchronizes here

// Buffered — sender doesn't block until buffer is full
bch := make(chan int, 3)
bch <- 1
bch <- 2
bch <- 3
// bch <- 4  // this would block

// Directional channels
func producer(ch chan<- int) { ch <- 1 }
func consumer(ch <-chan int) { fmt.Println(<-ch) }

// Ranging over a channel until closed
for val := range ch {
    fmt.Println(val)
}`,
    tags: ["channels", "concurrency", "buffered", "synchronization"],
  },
  {
    slug: "how-do-interfaces-work",
    title: "How does Go's interface system work, and what is implicit implementation?",
    topic: "interfaces",
    difficulty: "Easy",
    shortAnswer: "In Go, a type implements an interface by having all its methods — no 'implements' keyword required. This is structural (duck) typing at compile time.",
    answer: `Go interfaces are satisfied implicitly. If a type has all the methods that an interface declares, it implements that interface — no \`implements\` keyword, no class hierarchy.

This enables loose coupling: packages can define small interfaces without knowing the concrete types that satisfy them. The standard library's \`io.Reader\` (one method) and \`io.Writer\` (one method) are the canonical example.

**Interface values** are a pair of (type, value) under the hood. A nil interface has both set to nil; an interface holding a nil pointer is non-nil (a common gotcha).

**Empty interface** (\`any\` / \`interface{}\`) is satisfied by every type — use sparingly as it loses type safety.

**Type assertions** let you extract the concrete type: \`v, ok := i.(ConcreteType)\`.

**Type switches** let you branch on the dynamic type of an interface value.`,
    codeExample: `type Animal interface {
    Sound() string
    Name() string
}

// Dog implicitly implements Animal — no declaration needed
type Dog struct{ name string }
func (d Dog) Sound() string { return "woof" }
func (d Dog) Name() string  { return d.name }

// Works with any type that has these methods
func describe(a Animal) {
    fmt.Printf("%s says %s\\n", a.Name(), a.Sound())
}

// Type assertion
var a Animal = Dog{name: "Rex"}
if dog, ok := a.(Dog); ok {
    fmt.Println(dog.name)
}

// Type switch
switch v := a.(type) {
case Dog:
    fmt.Println("it's a dog:", v.name)
default:
    fmt.Println("unknown animal")
}`,
    tags: ["interfaces", "duck-typing", "type-assertion", "type-switch"],
  },
  {
    slug: "error-handling-patterns",
    title: "What are idiomatic error handling patterns in Go?",
    topic: "error-handling",
    difficulty: "Medium",
    shortAnswer: "Go returns errors as values. Idiomatic patterns include checking errors immediately, wrapping with fmt.Errorf + %w, and using errors.Is/As for inspection.",
    answer: `Go treats errors as values of the built-in \`error\` interface. There is no exception system — functions return \`(result, error)\` and callers check immediately.

**Key patterns:**

1. **Return and check**: Always check errors before using a result. The convention is \`if err != nil { return ..., err }\`.

2. **Wrapping errors** (\`fmt.Errorf\` with \`%w\`): Add context while preserving the original error in the chain. Use \`errors.Unwrap\` to traverse the chain.

3. **\`errors.Is\`**: Check if any error in the chain matches a specific sentinel value (e.g., \`io.EOF\`, \`os.ErrNotExist\`).

4. **\`errors.As\`**: Check if any error in the chain is of a specific type, and extract it for inspection.

5. **Custom error types**: Embed additional context by implementing the \`error\` interface on your own struct.

6. **Panic/recover**: Only for truly unrecoverable situations (programmer bugs, not expected errors). Don't use panic for normal control flow.`,
    codeExample: `// Basic pattern
result, err := doSomething()
if err != nil {
    return fmt.Errorf("doSomething failed: %w", err)
}

// Custom error type
type NotFoundError struct {
    Resource string
    ID       int
}
func (e *NotFoundError) Error() string {
    return fmt.Sprintf("%s with id %d not found", e.Resource, e.ID)
}

// errors.Is — sentinel values
if errors.Is(err, os.ErrNotExist) {
    // handle missing file
}

// errors.As — typed errors
var nfe *NotFoundError
if errors.As(err, &nfe) {
    fmt.Println("missing:", nfe.Resource, nfe.ID)
}`,
    tags: ["errors", "error-handling", "fmt.Errorf", "errors.Is", "errors.As"],
  },
  {
    slug: "nil-vs-empty-slice",
    title: "What is the difference between a nil slice and an empty slice in Go?",
    topic: "slices-maps",
    difficulty: "Easy",
    shortAnswer: "A nil slice has no underlying array and its pointer is nil. An empty slice has a non-nil pointer but length 0. Both have len 0 and can be ranged over safely.",
    answer: `A slice in Go is a three-word header: (pointer to array, length, capacity).

A **nil slice** has all three fields as zero values — the pointer is nil, length is 0, capacity is 0. It's the zero value of a slice type.

An **empty slice** (e.g., \`make([]int, 0)\` or \`[]int{}\`) has a non-nil internal pointer (to a zero-size allocation), but length and capacity are 0.

**In practice, they behave the same** for \`len\`, \`cap\`, \`range\`, and \`append\`. The difference matters when:
- **Marshaling to JSON**: nil slice → \`null\`; empty slice → \`[]\`
- **Reflect comparisons**: \`reflect.DeepEqual(nil, []int{}) == false\`
- **API contracts**: returning nil often means "no result"; empty means "result is the empty set"

The idiomatic preference is to return nil for "no data" and \`[]T{}\` when you explicitly mean "empty collection."`,
    codeExample: `var nilSlice []int        // nil, len=0, cap=0
emptySlice := []int{}     // non-nil, len=0, cap=0
madeSlice := make([]int, 0) // non-nil, len=0, cap=0

fmt.Println(nilSlice == nil)   // true
fmt.Println(emptySlice == nil) // false

// Both are safe to range and append
nilSlice = append(nilSlice, 1, 2, 3) // works fine

// JSON difference
type Response struct{ Items []int }
json.Marshal(Response{Items: nil})      // {"Items":null}
json.Marshal(Response{Items: []int{}})  // {"Items":[]}`,
    tags: ["slices", "nil", "memory", "json"],
  },
  {
    slug: "what-is-defer",
    title: "How does defer work in Go, and what are common use cases?",
    topic: "goroutines",
    difficulty: "Easy",
    shortAnswer: "defer schedules a function call to run when the surrounding function returns. Deferred calls execute LIFO, capture arguments at the time of the defer call, but can modify named return values.",
    answer: `\`defer\` pushes a function call onto a stack that is executed when the enclosing function returns — whether normally or via panic.

**Key behaviors:**
1. **LIFO order**: Multiple defers execute in last-in, first-out order.
2. **Arguments evaluated immediately**: The arguments to a deferred function are evaluated at the \`defer\` statement, not when the deferred function runs.
3. **Named return values**: A deferred function can read and modify named return values, enabling a clean "wrap error on return" pattern.
4. **Panic recovery**: \`defer\` + \`recover()\` is the only way to catch panics.

**Common use cases:**
- Closing files/connections: \`defer f.Close()\`
- Releasing mutex locks: \`defer mu.Unlock()\`
- Logging function exit or elapsed time
- Ensuring cleanup in tests`,
    codeExample: `// Resource cleanup — the idiomatic pattern
f, err := os.Open("file.txt")
if err != nil { log.Fatal(err) }
defer f.Close() // runs when function returns, even on panic

// LIFO order
defer fmt.Println("first deferred — runs last")
defer fmt.Println("second deferred — runs first")

// Arguments captured at defer time
x := 10
defer fmt.Println(x) // prints 10, not the value of x at return
x = 20

// Modifying named return values
func divide(a, b float64) (result float64, err error) {
    defer func() {
        if r := recover(); r != nil {
            err = fmt.Errorf("recovered: %v", r)
        }
    }()
    return a / b, nil
}`,
    tags: ["defer", "cleanup", "panic", "recover", "resource-management"],
  },
  {
    slug: "goroutine-leak-prevention",
    title: "How do you prevent goroutine leaks?",
    topic: "goroutines",
    difficulty: "Medium",
    shortAnswer: "Goroutine leaks happen when goroutines block forever. Prevent them by always providing a way to signal cancellation — via context.Context, a done channel, or closing the input channel.",
    answer: `A goroutine leak is a goroutine that is stuck waiting forever, never able to exit. Since goroutines consume memory and potentially hold resources, leaks degrade performance over time.

**Common causes:**
- Blocked channel send/receive with no reader/writer ever arriving
- Waiting on a mutex that's never unlocked
- Infinite loop with no exit condition
- HTTP handlers or database queries with no timeout

**Prevention strategies:**

1. **\`context.Context\`**: Pass a context to every long-running goroutine. When the context is cancelled/timed out, the goroutine should exit.

2. **Done channels**: Pass a \`<-chan struct{}\` that is closed when the goroutine should stop.

3. **Close input channels**: A goroutine ranging over a channel will exit when the channel is closed.

4. **Always pair goroutines with a cleanup mechanism**: If you \`go f()\`, make sure there's a guaranteed path for \`f\` to return.

5. **Use \`goleak\`** in tests: The \`go.uber.org/goleak\` library detects leaked goroutines in tests.`,
    codeExample: `// Bad — goroutine leaks if no one reads ch
func leaky() {
    ch := make(chan int)
    go func() {
        ch <- heavyComputation() // blocks forever if caller exits
    }()
}

// Good — context cancellation provides an escape hatch
func safe(ctx context.Context) {
    ch := make(chan int, 1)
    go func() {
        select {
        case ch <- heavyComputation():
        case <-ctx.Done(): // exit if context cancelled
        }
    }()

    select {
    case result := <-ch:
        fmt.Println(result)
    case <-ctx.Done():
        fmt.Println("cancelled:", ctx.Err())
    }
}

// goleak in tests
func TestSomething(t *testing.T) {
    defer goleak.VerifyNone(t)
    // ... test code
}`,
    tags: ["goroutines", "leaks", "context", "channels", "goleak"],
  },
  {
    slug: "sync-waitgroup",
    title: "What is sync.WaitGroup and when should you use it?",
    topic: "goroutines",
    difficulty: "Easy",
    shortAnswer: "sync.WaitGroup lets a goroutine wait for a collection of goroutines to finish. Call Add before launching, Done in each goroutine, and Wait to block until all complete.",
    answer: `\`sync.WaitGroup\` is a synchronization primitive that allows one goroutine to wait for a group of goroutines to complete their work.

**API:**
- \`wg.Add(n)\`: Increment the counter by n before launching n goroutines
- \`wg.Done()\`: Decrement the counter by 1 (call this in each goroutine, typically via \`defer wg.Done()\`)
- \`wg.Wait()\`: Block until the counter reaches zero

**When to use it:** Fan-out patterns where you launch N goroutines to do work in parallel and need to know when all are done before proceeding.

**Gotchas:**
- Always call \`Add\` before the goroutine starts (not inside it), or you risk a race with \`Wait\`
- Don't copy a \`WaitGroup\` — pass a pointer or use it as a field
- Prefer channels or \`errgroup\` if you need to collect results or propagate errors`,
    codeExample: `func processAll(items []Item) {
    var wg sync.WaitGroup

    for _, item := range items {
        wg.Add(1) // Add BEFORE launching the goroutine
        go func(item Item) {
            defer wg.Done() // Done runs when goroutine exits
            process(item)
        }(item)
    }

    wg.Wait() // blocks until all goroutines call Done
    fmt.Println("all done")
}

// For error collection, prefer golang.org/x/sync/errgroup
func processWithErrors(ctx context.Context, items []Item) error {
    g, ctx := errgroup.WithContext(ctx)
    for _, item := range items {
        item := item
        g.Go(func() error {
            return process(ctx, item)
        })
    }
    return g.Wait() // returns first non-nil error
}`,
    tags: ["sync", "WaitGroup", "concurrency", "fan-out", "errgroup"],
  },
  {
    slug: "go-generics",
    title: "What are generics in Go and when should you use them?",
    topic: "generics",
    difficulty: "Medium",
    shortAnswer: "Generics (Go 1.18+) allow type-parameterized functions and types via type parameters. Use them for reusable algorithms and data structures, not as a default abstraction.",
    answer: `Go 1.18 introduced generics via **type parameters**. You declare a type parameter list in square brackets \`[T constraint]\` on functions or types, allowing them to work with any type that satisfies the constraint.

**Constraints** define what operations are allowed on type parameters. \`any\` means no constraints (only assignment/comparison allowed). \`comparable\` means \`==\` is supported. The \`constraints\` package and \`~\` operator let you build union constraints.

**When to use generics:**
- Reusable data structures (stacks, queues, sets, trees)
- Generic algorithms (Map, Filter, Reduce over slices)
- Functions that operate on multiple numeric types

**When NOT to use generics:**
- When an interface already works well
- For simple one-off functions — don't abstract prematurely
- When the added complexity outweighs the reuse benefit

The Go team's guidance: "Write code, don't design types." Reach for generics when you find yourself writing the same logic for multiple types.`,
    codeExample: `// Generic function — works on any ordered type
func Min[T constraints.Ordered](a, b T) T {
    if a < b {
        return a
    }
    return b
}

// Generic data structure
type Stack[T any] struct {
    items []T
}

func (s *Stack[T]) Push(item T) {
    s.items = append(s.items, item)
}

func (s *Stack[T]) Pop() (T, bool) {
    if len(s.items) == 0 {
        var zero T
        return zero, false
    }
    item := s.items[len(s.items)-1]
    s.items = s.items[:len(s.items)-1]
    return item, true
}

// Usage — type is inferred
fmt.Println(Min(3, 5))       // int, inferred
fmt.Println(Min(3.14, 2.71)) // float64, inferred

s := Stack[string]{}
s.Push("hello")
s.Push("world")
v, _ := s.Pop() // "world"`,
    tags: ["generics", "type-parameters", "constraints", "go1.18"],
  },
  {
    slug: "garbage-collection",
    title: "How does Go's garbage collector work?",
    topic: "memory",
    difficulty: "Hard",
    shortAnswer: "Go uses a concurrent, tri-color mark-and-sweep GC that runs mostly in parallel with application goroutines. It targets sub-millisecond stop-the-world pauses.",
    answer: `Go's GC is a **concurrent, non-generational, tri-color mark-and-sweep** collector.

**How it works:**

1. **Mark phase**: The GC traverses the object graph starting from roots (globals, goroutine stacks). Objects are colored: white (not yet visited), grey (queued), black (fully scanned). At the end, white objects are unreachable and can be freed.

2. **Sweep phase**: White (unreachable) memory is reclaimed and returned to the heap free lists.

3. **Concurrency**: Most work happens concurrently with application goroutines. Short stop-the-world (STW) pauses happen at the start (enabling the write barrier) and end (terminating mark phase) — typically under 1 ms.

4. **Write barrier**: During concurrent marking, a write barrier intercepts pointer writes to ensure the GC doesn't miss objects that are modified concurrently.

5. **GOGC / GC target**: The \`GOGC\` env var (default 100) controls the GC target: trigger GC when the heap has grown 100% since the last collection. \`GOMEMLIMIT\` (Go 1.19+) caps total memory use.

**Tuning tips:**
- Reduce allocations (use \`sync.Pool\`, prefer stack allocation)
- Use \`pprof\` to find allocation hotspots
- Avoid large heaps of pointer-heavy objects (more to scan)`,
    codeExample: `// Reduce pressure with sync.Pool for short-lived objects
var bufPool = sync.Pool{
    New: func() any { return new(bytes.Buffer) },
}

func handler(w http.ResponseWriter, r *http.Request) {
    buf := bufPool.Get().(*bytes.Buffer)
    buf.Reset()
    defer bufPool.Put(buf)

    buf.WriteString("hello world")
    w.Write(buf.Bytes())
}

// Check GC stats programmatically
var stats runtime.MemStats
runtime.ReadMemStats(&stats)
fmt.Printf("NumGC: %d, PauseTotalNs: %d\\n", stats.NumGC, stats.PauseTotalNs)

// Force a GC (for benchmarks/tests only)
runtime.GC()`,
    tags: ["GC", "garbage-collection", "memory", "performance", "runtime"],
  },
];

export function getQuestion(slug: string): Question | undefined {
  return questions.find((q) => q.slug === slug);
}

export function getQuestionsByTopic(topicSlug: string): Question[] {
  return questions.filter((q) => q.topic === topicSlug);
}

export function getTopic(slug: string): Topic | undefined {
  return topics.find((t) => t.slug === slug);
}

export const difficultyColor: Record<Difficulty, string> = {
  Easy: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
  Medium: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  Hard: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
};
