# intel-8086-simulator

Instructions Encoding Table:

> Source: "Intel 8086 Family User's Manual"
> ([Table 4-12 "8086 Instruction Encoding"](https://archive.org/details/bitsavers_intel80869lyUsersManualOct79_62967963/page/n260/mode/1up))

```
bytes: 7 6 5 4 3 2 1 0 | 7 6 5 4 3 2 1 0
-----------------------+----------------
mov  : 1 0 0 0 1 0 d w | mod reg   r/m
```