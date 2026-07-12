Durable event stream

# Typed events. Durable by default.

Ferrite is an append-only event log with a schema registry built in. Every event is validated against a versioned type before it is written. At-least-once delivery, tunable to exactly-once per partition. Replay any consumer from an offset .

## What it guarantees

registry

### Typed by contract

Producers publish against a registered schema. An event that fails validation is rejected at write time, not discovered three services downstream.

delivery

### At-least-once, tunable

Default at-least-once with idempotent producer keys; opt into exactly-once semantics per partition when you need it. The trade-off is explicit, never hidden.

replay

### Replayable by offset

The log is the source of truth. Rewind a consumer group to any retained offset and reprocess deterministically.

## Capability matrix

How a durable typed log compares to the two shapes teams usually reach for first. These are Ferrite's own capabilities, not a benchmark against any named product.

## Publish a typed event

A producer references a registered schema by name and version. The client library is thin; the contract lives in the registry.
