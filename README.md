# Hanoi tower
Реализация (скрипт + визуализация) решения задачи "Ханойская башня"

## Суть задачи
Есть три стержня, на один из которых нанизаны кольца (обычно в количестве восьми). Кольца различаются размером и лежат меньшее на большем. Задача состоит в том, чтобы перенести пирамиду за наименьшее число ходов на другой стержень. За один раз разрешается переносить только одно кольцо, причём нельзя класть большее кольцо на меньшее.

## Решение
Решение сводится к чередованию перекладыванию верхнего кольца в одном направлении (если номер исходного стержня 1, а целевого - 2, то при чётном кол-ве колец это 1-3-2-1-3-2 итд, при нечётном - 1-2-3-1-2-3 итд) и перекладыванию с пары оставшихся стержней меньшего кольца на большее. Таким путём мы собираем на свободных штырях растущую "с  конца" башню то на 2м, то на 3м штыре, а на свободный перекладываем очередное большое кольцо с 1го штыря, и оно служит базой для башни на 1 ярус выше.

## Реализация
Программа реализовывает указанное решение на тайпскрипт и помимо самой задачи демонстрирует работу с массивами по концепции Last In, First Out (LIFO). Кроме того, присутствует счётчик ходов, позволяющий убедиться, что башня собирается за 2^n - 1 ходов, где n - высота башни, что соответствует цели задачи.

## Визуализация
Исходная башня представлена в виде типичной детской пирамидки с нумерацией колец от большего к меньшему.
При старте программы можно выбрать высоту (количество колец) башни и продолжительность паузы между ходами (в мс), после чего задача будет выполняться в автоматическом режиме.  

## Сборка и запуск проекта
1) Установите пакеты при помощи привычного мендежера пакетов:
``` pnpm i ``` (пример для pnpm)
2) соберите дев-версию:
``` pnpm dev ``` (пример для pnpm)
или продакшн-версию:
``` pnpm build ``` (пример для pnpm)
3) для дев-версии:
   перейдите по ссылке на localHost из консоли
для билд-версии:
запустите index.html из папки dist

### Демонстрация программы:
https://sm1lent.github.io/hanoi_tower/
