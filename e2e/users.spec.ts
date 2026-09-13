import { expect, test } from "@playwright/test"

const usersUrl = "https://api.e2e.test/users"

const users = [
  {
    id: "user-1",
    name: "张三",
    email: "ada@example.com",
    role: "admin",
    status: "active",
  },
  {
    id: "user-2",
    name: "李四",
    email: "grace@example.com",
    role: "member",
    status: "disabled",
  },
]

// 定义一个 E2E 测试用例。
//
// 第一个参数是测试名称，用来描述该测试保护的用户行为：
// 用户能否从首页进入用户列表页。
//
// 第二个参数是异步测试函数。
// Playwright 会向函数提供测试夹具，page 是其中最常用的一个。
// page 表示浏览器中的一个标签页，可以用它访问页面、操作元素和拦截请求。
test("navigates from home to the user list", async ({ page }) => {
  // 注册浏览器请求拦截规则。
  //
  // usersUrl 的值是：
  // https://api.e2e.test/users
  //
  // 当当前页面向这个地址发出请求时，Playwright 会调用后面的
  // route handler，而不会让请求继续访问真实后端。
  //
  // 这一步必须放在 page.goto() 和点击 Users 之前，
  // 否则页面可能已经发出请求，Playwright 就无法及时拦截。
  await page.route(usersUrl, async (route) => {
    // 使用测试准备好的响应结束这次请求。
    //
    // route.fulfill() 表示：
    // 不再将请求发送给真实服务器，
    // 而是直接把下面的内容作为接口响应返回给浏览器。
    await route.fulfill({
      // 设置 HTTP 响应状态码为 200。
      // 表示接口请求成功。
      status: 200,

      // 设置响应头。
      headers: {
        // 允许其他来源的页面读取当前接口响应。
        //
        // 当前页面运行在：
        // http://127.0.0.1:4173
        //
        // 接口地址是：
        // https://api.e2e.test
        //
        // 两者协议、域名和端口不同，因此属于跨域请求。
        // 这里增加 CORS 响应头，允许浏览器接受这个模拟响应。
        "access-control-allow-origin": "*",
      },

      // 设置 JSON 响应体。
      //
      // users 是测试提前准备的用户数组，例如：
      //
      // [
      //   {
      //     id: "user-1",
      //     name: "张三",
      //     email: "ada@example.com",
      //     role: "admin",
      //     status: "active",
      //   },
      // ]
      //
      // Playwright 会把这个数组序列化成 JSON，
      // 并自动把 Content-Type 设置为 application/json。
      json: users,
    })
  })

  // 让浏览器访问应用首页。
  //
  // Playwright 配置中设置了：
  //
  // baseURL: "http://127.0.0.1:4173"
  //
  // 因此相对地址 "/" 会被解析为：
  //
  // http://127.0.0.1:4173/
  //
  // page.goto() 会等待页面完成基本导航和加载。
  await page.goto("/")

  // 检查首页标题是否在页面中可见。
  //
  // getByRole("heading") 按可访问性角色查找标题元素，
  // 通常对应 h1、h2 等标题标签。
  //
  // name: "frontend-engineering-system"
  // 表示标题的可访问名称必须与该文本匹配。
  //
  // 这里不是只检查标题节点存在，还通过 toBeVisible()
  // 确认真实用户能够在页面中看到它。
  await expect(
    page.getByRole("heading", {
      name: "frontend-engineering-system",
    }),
  ).toBeVisible()

  // 查找并点击名称为 Users 的链接。
  //
  // getByRole("link") 表示按链接语义定位元素，
  // name: "Users" 表示链接的可访问名称是 Users。
  //
  // click() 会模拟真实浏览器中的用户点击行为。
  //
  // 点击后，React Router 会把当前页面从首页切换到：
  //
  // /users
  //
  // 并渲染 UserListPage。
  await page.getByRole("link", { name: "Users" }).click()

  // 检查浏览器地址是否已经切换到 /users。
  //
  // toHaveURL() 会等待地址满足条件，因此不需要手动延时。
  //
  // /\/users$/ 是一个正则表达式：
  //
  // \/users  -> 匹配字符串中的 /users
  // $         -> 表示 /users 必须出现在地址末尾
  //
  // 它可以匹配：
  //
  // http://127.0.0.1:4173/users
  //
  // 但不会匹配：
  //
  // http://127.0.0.1:4173/users/settings
  await expect(page).toHaveURL(/\/users$/)

  // 检查用户列表页的标题是否可见。
  //
  // 这可以证明：
  //
  // 1. Users 链接能够点击。
  // 2. React Router 完成了路由跳转。
  // 3. UserListPage 已经成功渲染。
  await expect(
    page.getByRole("heading", {
      name: "用户",
    }),
  ).toBeVisible()

  // 等待并检查第一个用户的姓名是否可见。
  //
  // UserListPage 渲染后会通过 TanStack Query 调用 getUsers()。
  // getUsers() 再通过 httpGet() 和 fetch 发出请求。
  //
  // 请求会被前面注册的 page.route() 拦截，
  // 并获得 users 数组作为响应。
  //
  // Playwright 的网页断言具有自动等待能力。
  // 如果“张三”暂时还没有出现，toBeVisible() 会在超时前持续等待，
  // 所以不需要编写 setTimeout 或固定延时。
  await expect(page.getByText("张三")).toBeVisible()

  // 检查第一个用户的邮箱是否可见。
  //
  // 这进一步确认接口响应中的用户数据
  // 已经经过请求层和页面组件正确渲染到 DOM。
  await expect(page.getByText("ada@example.com")).toBeVisible()

  // 检查第二个用户的姓名是否可见。
  //
  // 这可以确认页面不是只渲染了第一条数据，
  // 而是正确遍历了接口返回的用户数组。
  await expect(page.getByText("李四")).toBeVisible()
})
