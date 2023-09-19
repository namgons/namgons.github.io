---
title: "[번역] Collection의 공식 문서 읽기"
# description: "Collection의 Javadoc을 읽어보자"
date: 2023-09-19
update: 2023-09-19
tags:
  - Java Collections Framework
  - Collection
  - JCF
  - 자바
  - 컬렉션
series: "[번역] Java Collections Framework의 공식 문서 읽기"
---

> 이 글은 자바 컬렉션 프레임워크(Java Collections Framework)에 포함된 여러 인터페이스와 클래스의 Javadoc 문서를 읽고 번역한 글입니다. 번역은 대부분 제가 직접 했고 일부 ChatGPT의 도움을 받았습니다. 의미를 구분하거나 분명히 해야 하는 경우에는 영문을 그대로 남겼습니다. 어색한 표현이나 수정해야 할 부분은 댓글로 남겨주시면 감사드리겠습니다.

## Collection

`Collection` 계층의 루트 인터페이스입니다. 컬렉션은 객체(컬렉션의 요소)의 집합을 표현합니다. 어떤 컬렉션은 중복된 요소를 허용하고, 어떤 컬렉션은 허용하지 않습니다. 어떤 컬렉션은 정렬되어 있고, 어떤 컬렉션은 정렬되어 있지 않습니다. JDK는 이 인터페이스의 직접적인 구현체를 제공하지 않습니다. `Set`이나 `List` 같은 조금 더 구체적인 서브 인터페이스의 구현체를 제공합니다. 이 인터페이스는 일반적으로 컬렉션은 전달하고 일관되게 조작할 수 있도록 사용됩니다.

`Bags`나 `multisets` (중복된 요소를 포함하는 정렬되지 않은 컬렉션)은 이 인터페이스를 직접적으로 구현해야 합니다.

모든 범용적인 컬렉션 구현 클래스(일반적으로 `Collection`의 서브 인터페이스 중 하나를 통해 `Collection`을 구현합니다.)는 두 개의 “표준” 생성자를 제공해야 합니다. 빈(empty) 컬렉션을 생성하는 void 생성자와 컬렉션 형식의 단일 인자를 받고 해당 인자의 요소와 동일한 요소를 가지는 새로운 컬렉션을 생성하는 생성자입니다. 사실, 후자의 생성자는 사용자가 모든 컬렉션을 복사하여 원하는 구현 타입과 동등한 컬렉션을 생성할 수 있도록 합니다. 이 컨벤션을 강요하는 방법은 없지만(인터페이스는 생성자를 가질 수 없기 때문에), Java 플랫폼 라이브러리의 모든 범용적인 Collection 구현체들은 이를 준수합니다.

특정 메서드는 선택적으로 지정됩니다. 만약 구현체가 한 특정 메소드를 구현하지 않은 경우, 해당 메소드가 `UnsupportedOperationException`을 발생시키도록 정의해야 합니다. 이런 특정 메소드들은 컬렉션 인터페이스들의 메소드 명세에서 “optional operation”이라 표기되어 있습니다.

일부 컬렉션 구현체들은 그들이 포함할 수 있는 요소들에 제한이 있습니다. 예를 들어, 어떤 구현체들은 `null` 요소를 금지하고, 어떤 구현체는 요소들의 타입에 제한이 있습니다. 부적격한 요소를 넣으려는 시도는 unchecked 예외, 보통 `NullPointerException`이나 `ClassCastException`을 발생시킵니다. 부적격한 요소의 존재를 쿼리하려는 시도는 예외를 발생시키거나 단순히 `false`를 반환합니다. 일부 구현체들은 행위 전에 금지시키거나 일부 구현체는 행위 후에 금지시킵니다. 보다 일반적으로, 부적격한 요소에 대한 작업을 시도하면 해당 작업의 완료로 인해 컬렉션에 자격이 없는 요소가 삽입되지 않을 경우 예외를 던지거나 구현에 따라 성공할 수 있습니다. 이러한 예외는 이 인터페이스 명세서에서 “optional"으로 표시됩니다.

동기화 전략은 각 컬렉션에 따라 다릅니다. 구현에서 더 강력한 보장이 제공되지 않는 경우, 다른 스레드에 의해 변형되는 컬렉션에 대한 어떤 메서드의 호출에서 정의되지 않은 동작이 발생할 수 있습니다. 이것은 직접적인 호출, 호출할 수 있는 메소드에게 컬렉션을 전달하는 것, 그리고 컬렉션을 검사하기 위해 존재하는 iterator를 사용하는 것을 포함합니다.

Collections Framework 인터페이스의 많은 메소드들은 `equals` 메소드에 의해 정의되어 있습니다. 예를 들어, `contains(Object o)` 메소드의 명세서에는 “이 컬렉션이 `(o==null ? e==null : e.equals(e))`를 만족하는 요소 `e`를 최소 하나를 포함해야 `true`를 반환한다”라고 나와있습니다. 이 명세가 `Collection.contains`를 `null`이 아닌 인자 `o`로 호출할 경우 `o.equals(e)`가 모든 요소 `e`에 대해 호출된다는 것으로 이해되서는 안 됩니다. `equals` 호출이 금지되고 예를 들어, 두 요소의 해시 코드를 먼저 비교하는 등의 방법으로 자유롭게 최적화를 할 수 있습니다. (`Object.hashCode()` 명세는 서로 다른 해시 코드를 가지는 두 객체는 다르다는 것을 보장합니다.) 보다 일반적으로, 여러 Collections Framework 인터페이스의 구현체는 구현자가 적절하다고 판단하는 경우에 기본 Object 메서드의 명시된 동작을 활용할 수 있습니다.

직간접적으로 자기 자신을 포함하는 자기 참조 인스턴스에서 컬렉션을 재귀적으로 순회하는 일부 컬렉션 작업은 예외를 발생시킬 수 있습니다. 여기에는 `clone()`, `equals()`, `hashCode()`, `toString()` 메소드가 포함됩니다. 구현체는 선택적으로 자기 참조를 할 수 있지만, 현재 대부분의 구현체는 그렇지 않습니다.

## View Collections

대부분의 컬렉션들은 자신들이 포함하는 요소들의 저장 공간을 관리합니다. 이와 반대로, view 컬렉션들은 그들 스스로 요소를 관리하지 않고 대신 실제 요소를 저장하기 위해 backing 컬렉션에 의존합니다. view 컬렉션에 의해 관리되지 않는 동작들은 backing 컬렉션에게 위임됩니다. view 컬렉션의 예시로는 `Collections.checkedCollection`, `Collections.synchronizedCollection`, `Collections.unmodifiableCollection` 등의 메소드에 의해 반환되는 wrapper 컬렉션들이 있습니다. 또 다른 예로는 `List.subList`, `NavigableSet.subSet`, `Map.entrySet` 등으로 같은 요소의 다른 표현법을 제공하는 컬렉션이 있습니다. backing 컬렉션에 대한 모든 변경 사항은 view 컬렉션에서도 볼 수 있습니다. 마찬가지로, view 컬렉션에서 (변경이 허용된 경우) 수행된 모든 변경 사항은 backing 컬렉션에 저장됩니다. 비록 Iterator와 ListIterator의 인스턴스가 컬렉션은 아니지만, 그들 역시 backing 컬렉션으로의 변경 사항이 저장되는 것을 허용할 수 있고, 때때로 backing 컬렉션의 변경이 Iterator가 반복하는 동안 보일 수도 있습니다.

## Unmodifiable Collections

이 인터페이스의 특정 메소드들은 “파괴적”으로 간주되고 “mutator(변경자)”라고 불리는 점에서 그들은 그들이 동작하는 컬렉션에 포함된 객체들의 집합을 수정할 수 있습니다. 이 컬렉션 구현체가 동작을 구현하지 않으면 이 메소드들은 `UnsupportedOperationException`을 발생시키도록 명시될 수 있습니다. 이런 메소드들은 (필수는 아니지만) 호출이 컬렉션에 아무 영향을 주지 않은 경우, `UnsupportedOperationException`을 발생시켜야 합니다. 예를 들어, `add` 동작을 지원하지 않는 컬렉션에 대해서 생각해봅시다. 인자로 빈(empty) 컬렉션와 함께 이 컬렉션에서 `addAll` 메소드가 호출되면 어떤 일이 발생할까요? 요소를 추가하지 않는 경우, 영향을 주지 않기 때문에 이 컬렉션은 단순히 아무것도 하지 않고 예외를 발생시키지 않아도 괜찮습니다. 하지만 특정한 경우에만 예외를 발생시키는 것은 프로그래밍 오류를 유발할 수 있기 때문에, 이러한 경우에도 무조건 예외를 던지는 것이 권장됩니다.

unmodifiable 컬렉션들은 모든 변경자(mutator) 메소드이 `UnsupportedOperationException`를 발생시키도록 명시되어 있습니다. 그러므로 이런 컬렉션은 그의 어떤 메소드를 통해서도 변경될 수 없습니다. 컬렉션이 적절하게 변경되지 않게 하기 위해서, 여기서 파생된 모든 view 컬렉션 역시 변경 불가능이어야만 합니다. 예를 들어 List가 변경 불가능하다면, `List.subList`로 반환되는 List 역시 변경 불가능해야 합니다.

unmodifiable 컬렉션들이 꼭 immutable인 것은 아닙니다. 만약 포함된 요소가 mutable하다면, 전체 컬렉션이 unmodifiable일지라도 mutable합니다. (_의미를 분명히 하기 위해 영문 그대로 적었습니다._) 예를 들어, unmodifiable한 리스트 두 개가 mutable한 요소들을 포함한다고 합시다. 비록 두 리스트 모두 unmodifiable하더라도, 요소들이 mutated됨에 따라 `list1.equals(list2)`의 호출 결과가 달라질 수 있습니다. 하지만, 만약 unmodifiable한 컬렉션이 모두 immutable한 요소들을 가진다면, 이는 효과적으로 inmmutable합니다.

## Unmodifiable View Collections

unmodifiable view 컬렉션은 unmodifiable한 동시에 backing 컬렉션의 view입니다. 이들의 변경자(mutator) 메소드들은 `UnsupportedOperationException`을 던지는 반면(위에서 설명했듯), 읽기와 쿼리 메소드들은 backing 컬렉션에게 위임합니다. 이는 backing 컬렉션으로의 읽기 전용(read-only) 접근을 제공합니다. 이것은 구성 요소가 내부 컬렉션에 대한 읽기 액세스를 제공하면서 사용자가 이러한 컬렉션을 예상치 못하게 수정하는 것을 방지하는 데 유용합니다. unmodifiable view 컬렉션의 예로는 `Collections.unmodifiableCollection`, `Collections.unmodifialbeList`, 그리고 관련된 메소드들의 반환값이 있습니다.

backing 컬렉션의 수정은 여전히 가능하고, 만약 발생한다면 그들은 unmodifiable view를 통해 보일 것입니다. 그러므로 unmodifiable view 컬렉션은 꼭 immutable할 필요는 없습니다. 하지만 unmodifiable view의 backing 컬렉션이 사실상 immutable이 불가능하거나 backing 컬렉션에 대한 유일한 참조가 unmodifiable view를 통해서만 이루어진 경우, 해당 view는 사실상 변경 불가능하다고 할 수 있습니다.

## Serializability of Collections

컬렉션의 직렬성(Serializability of Collections)는 선택적입니다. 따라서 어떤 컬렉션 인터페이스도 `java.io.Serializable` 인터페이스를 구현하도록 선언되어 있지 않습니다. 하지만, 직렬성은 일반적으로 사용되는 것으로 간주되고, 따라서 대부분의 컬렉션 구현체들은 직렬적입니다(serializable).

public 클래스인 컬렉션 구현체(`ArrayList`나 `HashMap` 같은)는 실제로 직렬화 가능한 경우, `Serializable` 인터페이스를 구현하도록 선언되어 있습니다. unmodifiable 컬렉션 같은 컬렉션 구현체들은 public 클래스가 아닙니다. 이런 컬렉션의 직렬화는 그들을 생성하는 메소드의 명세나 다른 적절한 위치에 설명되어 있습니다. 컬렉션의 직렬성이 명세되지 않은 경우, 이러한 컬렉션의 직렬성은 보장되지 않습니다. 특히, 많은 view 컬렉션은 직렬적이지 않습니다.

`Serializable` 인터페이스를 구현하는 컬렉션 구현체는 직렬적임이 보장되지 않습니다. 일반적으로, 컬렉션은 다른 타입의 요소를 포함하고, 일부 요소의 인스턴스들이 실제로 직렬적인지 전역적으로 판단하는 것은 불가능하기 때문입니다. 예를 들어, `E`가 `Serializable` 인터페이스를 구현하지 않고, 직렬적인 `Collection<E>`에 대해서 생각해봅시다. `E`의 직렬적인 서브 타입의 요소들만 포함하거나 빈 경우에만 이 컬렉션은 직렬적일 것입니다. 따라서 컬렉션은 조건부로 직렬화 가능하다고 말할 수 있으며, 컬렉션 전체의 직렬화 여부는 컬렉션 자체가 직렬화 가능하고 모든 포함된 요소도 직렬화 가능한지에 따라 달라집니다.

추가적인 경우는 `SortedSet`과 `SortedMap`의 인스턴스에서 발생합니다. 이 컬렉션들은 집합 요소나 맵 키를 정렬하는 `Comparator`에 의해 생성됩니다. 이런 컬렉션은 주어진 Comparator가 직렬화 가능한 경우에만 직렬화가 가능합니다.

## 속성과 메소드

```java
public interface Collection<E> extends Iterable<E> {

    // Query Operations

    int size();
    boolean isEmpty();
    boolean contains(Object o);
    Iterator<E> iterator();
    Object[] toArray();
    <T> T[] toArray(T[] a);
    default <T> T[] toArray(IntFunction<T[]> generator) {
        return toArray(generator.apply(0));
    }

    // Modification Operations

    boolean add(E e);
    boolean remove(Object o);

    // Bulk Operations

    boolean containsAll(Collection<?> c);
    boolean addAll(Collection<? extends E> c);
    boolean removeAll(Collection<?> c);
    default boolean removeIf(Predicate<? super E> filter) {
        Objects.requireNonNull(filter);
        boolean removed = false;
        final Iterator<E> each = iterator();
        while (each.hasNext()) {
            if (filter.test(each.next())) {
                each.remove();
                removed = true;
            }
        }
        return removed;
    }
    boolean retainAll(Collection<?> c);
    void clear();

    // Comparison and hashing

    boolean equals(Object o);
    int hashCode();
    @Override
    default Spliterator<E> spliterator() {
        return Spliterators.spliterator(this, 0);
    }
    default Stream<E> stream() {
        return StreamSupport.stream(spliterator(), false);
    }
    default Stream<E> parallelStream() {
        return StreamSupport.stream(spliterator(), true);
    }
}
```