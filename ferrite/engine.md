Architecture

# How Ferrite works

Five stages sit between publish() and a durable, replayable record. Each one is a place a message queue usually cuts a corner; Ferrite does not.
- Append The event is appended to the partition's write-ahead segment. Writes are sequential; the offset is assigned atomically and returned to the producer.
- Validate against the registry Before the write commits, the payload is checked against the referenced schema version. A contract violation is rejected with the failing field path.
- Replicate The segment is replicated to N followers. A write acks only after the configured quorum has the record on disk ( acks=quorum ).
- Index offsets A sparse index maps offsets and timestamps to segment positions, so a replay from an arbitrary offset is a seek, not a scan.
- Serve Consumer groups read forward from their committed offset. Rewinding is a commit of an earlier offset — the log itself never mutates.

## Durability guarantees

What holds under each acknowledgement mode. Choose the row that matches your tolerance for latency versus loss; the guarantee is explicit.

## Limits & specifications

Hard limits of a single Ferrite cluster on the current release. Values are the product's configured ceilings, not marketing figures.
