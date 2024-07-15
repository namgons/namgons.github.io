---
title: "[백준/BOJ] 2560. 짚신벌레 (파이썬)"
date: 2024-04-03
tags:
  - PS
  - BOJ
  - 백준
  - Python
  - 누적합
  - 다이나믹프로그래밍
---

## ☘️ 문제

[2560번: 짚신벌레

첫째 줄에 a, b, d, N을 나타내는 네 정수가 빈칸 하나를 사이에 두고 차례로 주어진다. 단, 0 ＜ a ＜ b ＜ d ≤ 10,000이고, 1 ≤ N ≤ 1,000,000이다.

www.acmicpc.net](https://www.acmicpc.net/problem/2560)

## ☘️ 풀이

짚신벌레는 태어난지 `a`날이 지나고 `b`날이 될 때까지 개체를 만들어낼 수 있습니다. 반대로 날짜 기준으로 한다면, 현재 날짜를 `day`라고 할 때 `day - b`일부터 `day - a`일 사이에 있는 짚신벌레들이 개체를 만들어낼 수 있습니다. 즉, `day - b`일부터 `day - a`일 사이에 있는 짚신벌레의 수만큼 늘어나게 됩니다.

![boj-2560-01](./img/boj-2560-01.png)

같은 조건이 반복되고, 이전의 값이 계속 사용되어 저장해야 한다는 점에서 dp를 생각해볼 수 있습니다. 이때 저장되는 dp 값은 다음과 같이 정의할 수 있습니다. 단, 이때는 죽는 짚신벌레는 고려하지 않습니다. (이유는 아래에서 설명합니다.)

> dp[day] : 0일부터 `day`일**까지** 생존하는 짚신벌레의 수

dp에 저장되는 값이 누적합의 형태이기 때문에, `day - b`일부터 `day - a`일 사이에 있는 짚신벌레의 수는 `dp[day - a] - dp[day - b]`와 같습니다. 따라서, 점화식을 다음과 같이 세울 수 있습니다.

```
dp[day] = dp[day - 1] + dp[day - a] - dp[day - b]
```

이와 비슷한 논리로 짚신벌레는 태어난지 `d`일째에 죽는다는 것은 0일부터 `d`일까지 생존한다는 것입니다. 반대로 현재 날짜 `day`에 살아있는 짚신벌레의 수는 `day - d`일과 현재인 `day`일 사이에 있는 짚신벌레의 수입니다.

![boj-2560-02](./img/boj-2560-02.png)

추가 1) 코드 구현 시 뺄셈을 할 때, 음수값이 발생할 수 있기 때문에 나누는 수(1000)으로 한 번 더 해줍니다.

추가 2) `day`를 하나씩 늘리며 하루하루 진행할 때, 죽는 짚신벌레의 수를 빼주지 않아도 됩니다. 어차피 b < d이기 때문에, 태어난 지 `d`일이 지난 짚신벌레는 번식을 하지 못해 짚신벌레의 수를 늘리는데 영향을 주지 않습니다.

![boj-2560-03](./img/boj-2560-03.png)

8일째에 생존하는 짚신벌레의 수를 구할 때, 우선 죽는 것을 고려하지 않고 개체수를 늘립니다. 그리고 태어난 지 6일이 지난 짚신벌레 즉, 2일(8-6)에 살아있는 짚신벌레의 수만큼 빼주면 됩니다.

위에서 dp의 정의를 0일부터 현재까지 살아있는 짚신벌레의 수로 정했습니다. 죽은 짚신벌레를 빼기 위해 다음과 같이 코드를 짜게 된다면 중복으로 빠지는 짚신벌레가 발생하게 됩니다.

```
for day in range(1, n + 1):
    dp[day] = dp[day - 1]
    if a <= day:
        dp[day] = (dp[day] + dp[day - a]) % DIV
    if b <= day:
        dp[day] = (dp[day] - dp[day - b] + DIV) % DIV
    if d <= day:
        dp[day] = (dp[day] - dp[day - d] + DIV) % DIV # 이미 빠진 개체도 또 빠지게 됩니다. (dp의 값이 누적합이기 때문에)
```

어차피 죽는 개체는 이미 번식을 하지 못하기 때문에, 먼저 죽는 것을 고려하지 않고 짚신벌레의 수를 구한 이후에 한 번에 죽는 개체수를 빼주면 됩니다.

## ☘️ 전체 코드 (파이썬)

```
import sys

input = sys.stdin.readline

DIV = 1000


a, b, d, n = map(int, input().split())
dp = [0] * (n + 1)
dp[0] = 1

for day in range(1, n + 1):
    dp[day] = dp[day - 1]
    if a <= day:
        dp[day] = (dp[day] + dp[day - a]) % DIV
    if b <= day:
        dp[day] = (dp[day] - dp[day - b] + DIV) % DIV

answer = dp[n]
if d <= n:
    answer = (answer - dp[n - d] + DIV) % DIV

print(answer)
```