type ItemId = {id: string}
type ItemProps = {
    name: string,
    isBag: boolean,
    image: string,
    description: string,
    weight: number,
    cost: number,
}
type Item = ItemId & ItemProps;