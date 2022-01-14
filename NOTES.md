we need to read and write the files using streams
when writing json, it needs to be formatted into an array, or something, depends
now how to format json into a csv

# Todo
Think of edge cases to protect against
 - filter by .gz
 - skip first line


headers = version,account-id,interface-id,srcaddr,dstaddr,srcport,dstport,protocol,packets,bytes,start,end,action,log-status
const logExample = "AWSLogs/607487649814/vpcflowlogs/us-east-2/2022/01/13/05/607487649814_vpcflowlogs_us-east-2_fl-007edc593c7c0b891_20220113T0525Z_31dbb2ff.log.gz"
