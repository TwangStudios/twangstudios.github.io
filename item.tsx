type ItemId = {id?: string}
type ItemProps = {
    name: string,
    image?: string,
    description?: string,
}
type Item = ItemId & ItemProps;