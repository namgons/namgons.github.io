---
title: "[Java] Exception에 대한 고찰"
date: 2024-08-05
category: "Java"
tags:
  - Java
  - Exception
  - Checked Exception
  - Unchecked Exception
---

프로그램이 자바 언어의 제약을 벗어난다면, JVM은 Exception으로 프로그램에게 에러를 발생시킨다. 예시로 정해진 배열의 범위를 벗어나 접근하는 경우가 있다. 또한, 프로그램은 `throws`를 사용해서 명시적으로 Exception을 발생시킬 수 있다. 이러한 자바의 Exception의 종류와 동작 방식 등에 대해 알아보자.

## Exception의 종류

Exception은 Throwable 클래스 혹은 그 서브클래스들의 인스턴스로 표현된다. 즉, Throwable 클래스와 그의 모든 서브클래스는 모두 예외를 나타내는 클래스들이다.

Throwable 클래스의 직접 서브클래스(direct subclass)로는 Exception 클래스와 Error 클래스가 있다.

- Exception 클래스는 일반적인 프로그램에서 복구를 시도할 수 있는 모든 예외의 상위 클래스이다. RuntimeException은 Exception 클래스의 직접 서브클래스이다.
- Error 클래스는 일반적인 프로그램에서 복구가 기대되지 않는 모든 예외의 상위 클래스이다. 대표적인 예인 `OutOfMemoryError`, `StackOverflowError`와 같이 발생하더라도 개발자가 어찌할 수 없다.

Exception은 크게 Unchecked Exception과 Checked Exception으로 나뉜다.

- Unchecked Exception : Error 클래스, RuntimeException 클래스와 그의 서브 클래스를 말한다.
- Checked Exception : RuntimeException 클래스가 아닌 모든 Exception의 서브 클래스를 말한다.

### Unchecked Exception

Unchecked Exception은 Error 클래스, RuntimeException 클래스와 그의 서브 클래스를 말한다.

컴파일 타임에 예외 처리를 위한 핸들러의 유무를 확인하지 않는다. 따라서, 개발자가 예외 처리 핸들러를 구현하지 않아도 된다. 물론, 원하는 경우에는 `catch`문을 사용해서 예상되는 RuntimeException 예외를 처리해줄 수 있다.

Error 클래스는 잡아봤자 처리할 수 있는 방법이 없다. 개발자는 애플리케이션 코드에 Error 클래스에 대한 처리는 신경 쓰지 않아도 된다.

### Checked Exception

Checked Exception 클래스는 Unchecked Exception 클래스가 아닌 모든 Exception 클래스이다. 즉, RuntimeException 클래스 이외의 모든 Exception 클래스의 서브 클래스이다.

자바는 Checked Exception에 대한 핸들러를 포함하도록 강제하여, 컴파일 타임에 Checked Exception에 대한 핸들러가 있는지 확인한다. 개발자는 예외 처리 핸들러를 반드시 포함해야 한다. `catch`문으로 처리하거나 `throws`를 이용해서 다른 곳에서 처리하도록 해야 한다. 이런 예외 처리 핸들러의 유무를 컴파일 타임에 확인함으로써 처리되지 않는 예외의 수를 줄일 수 있다.

## 예외 처리 방식

예외를 처리하는 방식에는 예외 복구, 예외처리 회피, 예외 전환 등 3가지 방법이 있다.

### 예외 복구

예외 상황을 파악하고 문제를 해결해서 정상 상태로 돌려놓는 방법이다.

사용자가 특정 파일을 읽으려는데 파일이 없어 `IOException`이 발생하는 경우, 다른 파일을 선택하도록 유도하는 것으로 해결할 수 있다. 혹은 DB에 접속하는데에 실패하여 `SQLException`이 발생하는 경우, 여러 번 재시도하도록 할 수도 있다.

이처럼 사용자에게는 원하는 것처럼 동작하지 않았기 때문에 예외 상황으로 비쳐지더라도 애플리케이션에서는 정상적인 흐름에 따라 진행되어야 한다. 물론, 단순히 에러 메시지를 사용자에게 보여주는 것은 예외 복구로 볼 수 없다.

### 예외처리 회피

자신이 예외 처리를 하지 않고 자신을 호출한 곳에서 예외 처리를 하도록 던져버리는 것이다. `throws`문을 활용해서 예외 발생시 바로 던져버리거나, `catch`문으로 일단은 잡아 로그를 남기고 다시 예외를 던진다.

던질 것인지 말 것인지, 던져진 예외를 어디서 잡아서 처리할 것인지는 메소드의 역할에 달렸다. 자신에게서 발생한 예외를 그냥 던져버리는 것은 무책임한 책임회피이고, 코드적으로 봤을 때에도 적절하지 않다.

### 예외 전환

예외처리 회피와 같이 `throws`를 이용해서 자신을 호출한 곳에서 예외를 처리하도록 한다. 하지만, 예외처리 회피와 달리 적절한 다른 예외로 바꾸어 던진다는 특징이 있다.

예외 전환은 보통 두 가지 목적으로 사용된다.

1. 발생한 예외를 그대로 던지는 것이 예외 상황을 적절히 설명하지 못하는 경우, 더 구체적인 의미를 가진 예외로 바꾸기 위해 사용한다.

   예를 들어, 새로운 사용자를 등록하는데 이미 같은 아이디의 사용자가 존재하는 경우 `SQLException`이 발생한다. 하지만, 외부에 그대로 `SQLException`을 던져버리면 서비스 계층에서는 왜 `SQLException`이 발생했는지, 처리할 수 있는 것인지, 어떻게 처리할 지 등을 알 수 없다. 중복된 아이디에 대한 예외는 충분히 처리할 수 있기 때문에 적절한 예외로 바꾸어 던지는 것이 좋다.

2. 예외 처리를 쉽고 단순하게 만들기 위해서 사용한다.

   주로 예외 처리를 강제하는 Checked Exception에서 Unchecked Exception으로 바꾸는 경우에 사용한다. 예외 복구를 할 수 없거나 비즈니스적으로 의미가 없는 Checked Exception이라면 빠르게 RuntimeException으로 바꿔서 던지는 편이 좋다.

발생한 예외를 다른 예외로 전환하는 경우, 원래 발생한 예외를 담아 중첩 예외를 만드는 것이 좋다. 중첩 예외는 `getCause()` 메소드를 이용해서 처음 발생한 예외가 무엇인지 파악할 수 있다.

## JVM에서 예외를 처리하는 방법

## 예외 처리 비용

일반적으로 예외 처리 비용은 비싸다고 알려져 있다. 그럼 왜 비싸고, 얼마나 비싼 것일까?

우선, Baeldung의 [Performance Effects of Exceptions in Java](https://www.baeldung.com/java-exceptions-performance) 글에서 성능 측정을 한 결과는 다음과 같았다.

```java
Benchmark                                                 Mode  Cnt    Score   Error  Units
ExceptionBenchmark.createExceptionWithoutThrowingIt       avgt   10   16.605 ± 0.988  ms/op
ExceptionBenchmark.doNotThrowException                    avgt   10    0.047 ± 0.006  ms/op
ExceptionBenchmark.throwAndCatchException                 avgt   10   16.449 ± 0.304  ms/op
ExceptionBenchmark.throwExceptionAndUnwindStackTrace      avgt   10  326.560 ± 4.991  ms/op
ExceptionBenchmark.throwExceptionWithoutAddingStackTrace  avgt   10    1.185 ± 0.015  ms/op
```

1. 예외가 발생하고 잡는 것은 일반 상황에 비해 100배 정도의 시간이 소요된다.
2. try ~ catch문은 성능에 큰 영향을 주지 않는다.
3. 예외 객체를 만들어내는 과정이 대부분의 시간을 잡아먹는다. → 그 중에서도 Stack Trace를 생성하는 과정이 시간이 오래 걸린다.
4. 예외를 다시 타고 올라가는 것(unwind)하는 것 역시도 많은 시간 소요가 된다.

## [번외] Checked Exception에 대한 이슈

개발자에게 예외 처리를 강제하는 Checked Exception에 대한 이슈가 있다.

무조건 예상되는 예외를 처리하도록 하여 서비스의 안정성을 도모하고자 했지만, 이를 귀찮게 느낀 개발자들은 `catch`문으로 잡아만 두고 아무런 처리도 하지 않는다거나, 의미 없이 `throws Exception`만 한다는 것이다.

더 자세한 내용은 아래 글을 참고하자.

- [https://velog.io/@eastperson/Java의-Checked-Exception은-실수다-83omm70j](https://velog.io/@eastperson/Java%EC%9D%98-Checked-Exception%EC%9D%80-%EC%8B%A4%EC%88%98%EB%8B%A4-83omm70j)

## 참고 자료

- 토비의 스프링 3.1 Vol. 1
- https://docs.oracle.com/javase/specs/jls/se22/jls22.pdf
- https://docs.oracle.com/javase/specs/jvms/se22/jvms22.pdf
- https://stackoverflow.com/questions/36343209/which-part-of-throwing-an-exception-is-expensive
- https://www.baeldung.com/java-exceptions-performance
- https://shipilev.net/blog/2014/exceptional-performance/
