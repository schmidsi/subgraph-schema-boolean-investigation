```typescript
get test(): boolean | null {
    let value = this.get("test");
    return value!.toBoolean();
  }

  set test(value: boolean | null) {
    this.set("test", Value.fromBoolean(value));
  }

  get testRequired(): boolean {
    let value = this.get("testRequired");
    return value!.toBoolean();
  }

  set testRequired(value: boolean) {
    this.set("testRequired", Value.fromBoolean(value));
  }

  get testNumberOptional(): BigInt | null {
    let value = this.get("testNumberOptional");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }
```
