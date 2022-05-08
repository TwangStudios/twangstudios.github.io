type ItemId = {id?: string}
type ItemProps = {
    name: string,
    image?: string,
}
type Item = ItemId & ItemProps;