enum Network {
    TESTNET = 'testnet',
    MAINNET = 'mainnet',
    LOCALHOST = 'localhost'
}
enum Sort {
    BidAmount = "bid_amount",
    CreateAt = "create_at",
    UpdateAt = "update_at",
}
enum State {
    Pass = 'Pass',
    Pending = 'Pending',
    Cancel = 'Cancel',
}
enum OpenCurationAllBidsStatus {
    All = 'All',
    Pending = 'Pending',
    Ended = 'Ended',
}
export { Network, State, Sort, OpenCurationAllBidsStatus }