"use client"

import { useReducer, useState, type Reducer } from "react"

import { Badge, Button, Slider } from "@/component/ui"
import { faker } from "@faker-js/faker"
import { HelpCircleIcon, TreeDeciduousIcon } from "lucide-react"
import MerkleTree from "merkletreejs"
import { ArcherContainer, ArcherElement } from "react-archer"
import { encodePacked, keccak256 } from "viem"

type BoxDataListType = {
  color: string
  weight: number
  topRadiusValue: number
  bottomRadiusValue: number
}[]

export const useCalucateMerkleTree = (boxDataList: BoxDataListType) => {
  if (boxDataList[0].weight === 0) {
    return { rootHash: "" }
  }

  const leafNodes = boxDataList.map(boxData => {
    return keccak256(
      encodePacked(
        ["string", "uint256", "uint256", "uint256"],
        [
          boxData.color,
          BigInt(boxData.weight),
          BigInt(boxData.topRadiusValue),
          BigInt(boxData.bottomRadiusValue),
        ],
      ),
    )
  })

  const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true })
  const rootHash = merkleTree.getRoot()

  return {
    rootHash: "0x" + rootHash.toString("hex"),
  }
}

type generateBoxDataProps = {
  boxDataList: BoxDataListType
  topRadiusValue?: number
  bottomRadiusValue?: number
  isRadius?: boolean
}

const generateBoxData = ({
  boxDataList,
  topRadiusValue = 0,
  bottomRadiusValue = 0,
  isRadius = false,
}: generateBoxDataProps) => {
  if (!isRadius) {
    return boxDataList.map(() => {
      const color = faker.color.rgb({ casing: "upper" })
      const randomNumber = faker.number.int({ min: 1, max: 100 })
      return {
        color: color,
        weight: randomNumber,
        topRadiusValue: 0,
        bottomRadiusValue: 0,
      }
    })
  }

  return boxDataList.map(({ color, weight }) => {
    return {
      color,
      weight,
      topRadiusValue,
      bottomRadiusValue,
    }
  })
}

type StateType = {
  boxDataList: BoxDataListType
}

type ActionType =
  | {
      type: "ADD_BOX_DATA"
      initBoxData: BoxDataListType
    }
  | {
      type: "RESET_BOX_DATA"
      initBoxData: BoxDataListType
    }
  | {
      type: "CHANGE_RADIUS"
      payload: {
        topRadiusValue: number
        bottomRadiusValue: number
      }
    }

const merkleTreeReducer: Reducer<StateType, ActionType> = (state, action) => {
  switch (action.type) {
    case "ADD_BOX_DATA":
      const boxData = generateBoxData({ boxDataList: action.initBoxData })
      return {
        boxDataList: [...boxData],
      }
    case "RESET_BOX_DATA":
      return {
        boxDataList: action.initBoxData,
      }
    case "CHANGE_RADIUS":
      const changeRadiusData = generateBoxData({
        boxDataList: state.boxDataList,
        isRadius: true,
        ...action.payload,
      })

      return {
        boxDataList: [...changeRadiusData],
      }
    default:
      throw new Error("don't have this action type")
  }
}

export const MerkleTreeIntro = ({
  showBoxList = true,
  showBoxData = true,
  showChangeRadiusAndWeight = false,
} = {}) => {
  const [topRadiusValue, setTopRadiusValue] = useState(0)
  const [bottomRadiusValue, setBottomRadiusValue] = useState(0)

  if (!showBoxList) {
    faker.seed(123)
  }

  const initBoxData = {
    topRadiusValue: 0,
    bottomRadiusValue: 0,
    boxDataList: [
      {
        color:
          showBoxList === true
            ? "#FFCB47"
            : faker.color.rgb({ casing: "upper" }),
        weight:
          showBoxList === true ? 10 : faker.number.int({ min: 1, max: 100 }),
        topRadiusValue: 0,
        bottomRadiusValue: 0,
      },
      {
        color:
          showBoxList === true
            ? "#FFEF5C"
            : faker.color.rgb({ casing: "upper" }),
        weight:
          showBoxList === true ? 20 : faker.number.int({ min: 1, max: 100 }),
        topRadiusValue: 0,
        bottomRadiusValue: 0,
      },
    ],
  }

  const [state, dispatch] = useReducer(merkleTreeReducer, initBoxData)
  const { boxDataList } = state

  const handleAddBoxData = () => {
    dispatch({ type: "ADD_BOX_DATA", initBoxData: initBoxData.boxDataList })
  }

  const handleResetBoxData = () => {
    dispatch({ type: "RESET_BOX_DATA", initBoxData: initBoxData.boxDataList })
  }

  const handleRadiusChange = (
    topRadiusValue: number,
    bottomRadiusValue: number,
  ) => {
    dispatch({
      type: "CHANGE_RADIUS",
      payload: { topRadiusValue, bottomRadiusValue },
    })
  }

  const { rootHash } = useCalucateMerkleTree(boxDataList)

  return (
    <ArcherContainer
      strokeColor="#9ba1a6"
      endMarker={false}
      // svgContainerStyle={{zIndex: -1}}
    >
      <div className="not-prose mb-12 bg-slatedark-4">
        <div className="flex flex-col gap-16 px-4 py-8 sm:p-8">
          <div className="flex items-center justify-center gap-8">
            <ArcherElement id="root">
              <div className="flex w-full max-w-[min(100%,160px)] items-center justify-center bg-slatedark-6 p-4 md:aspect-video">
                <Badge
                  className="scrollbar-hide flex w-20 items-center overflow-x-auto whitespace-nowrap bg-greendark-4 text-greendark-11 hover:bg-greendark-5"
                  variant="green"
                >
                  {rootHash}
                </Badge>
              </div>
            </ArcherElement>
          </div>
          <div className="flex items-center justify-center gap-8">
            <ArcherElement
              id="bot"
              relations={[
                {
                  targetId: "root",
                  targetAnchor: "bottom",
                  sourceAnchor: "top",
                },
              ]}
            >
              <TreeDeciduousIcon className="h-16 w-16 text-greendark-11" />
            </ArcherElement>
          </div>

          <div className="scrollbar-hide flex items-center justify-center gap-8 overflow-x-auto whitespace-nowrap">
            {boxDataList?.map(({ color, weight }) => {
              return (
                <ArcherElement
                  id={color}
                  key={color}
                  relations={[
                    {
                      targetId: "bot",
                      targetAnchor: "bottom",
                      sourceAnchor: "top",
                    },
                  ]}
                >
                  {showBoxList === true ? (
                    <div
                      style={{
                        borderColor: color,
                        borderRadius:
                          showChangeRadiusAndWeight === true
                            ? `${topRadiusValue}px ${topRadiusValue}px ${bottomRadiusValue}px ${bottomRadiusValue}px`
                            : "0px",
                      }}
                      className={`isolate flex h-full w-full max-w-[min(100%,160px)] items-center justify-center overflow-hidden border-4 bg-slatedark-6 px-2 py-4 text-center text-base text-slatedark-12 md:aspect-video md:p-4`}
                    >
                      <p>重さ：{weight}g</p>
                    </div>
                  ) : (
                    <div
                      className={`flex w-full max-w-[min(100%,160px)] items-center justify-center border-4 border-slatedark-8 bg-slatedark-6 px-2 py-4 text-center sm:p-4 md:aspect-video`}
                    >
                      <HelpCircleIcon className="h-9 w-9 text-slatedark-11" />
                    </div>
                  )}
                </ArcherElement>
              )
            })}
          </div>
        </div>
        {showChangeRadiusAndWeight === true ? (
          <div className="bg-slatedark-2 px-6 py-4">
            <div className="text-slatedark-12">
              <div>
                <span className="mb-2 block font-semibold ">top radius</span>
                <div className="mb-2 flex gap-4">
                  <Slider
                    defaultValue={[0]}
                    value={[topRadiusValue]}
                    max={100}
                    step={1}
                    onValueChange={([prev]) => {
                      setTopRadiusValue(prev)
                      handleRadiusChange(prev, bottomRadiusValue)
                    }}
                  />
                </div>
              </div>
              <div>
                <span className="mb-2 block font-semibold">bottom radius</span>
                <div className="flex gap-4">
                  <Slider
                    defaultValue={[0]}
                    value={[bottomRadiusValue]}
                    max={100}
                    step={1}
                    onValueChange={([prev]) => {
                      setBottomRadiusValue(prev)
                      return handleRadiusChange(topRadiusValue, prev)
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : showBoxData === true ? (
          <div className="bg-slatedark-2 px-6 py-4">
            <span className="mb-2 block font-semibold text-slatedark-12">
              box data
            </span>
            <div className="flex gap-4">
              <Button
                size="sm"
                className="w-fit bg-slatedark-9 text-slatedark-12 hover:bg-slatedark-10"
                onClick={handleAddBoxData}
              >
                change
              </Button>
              <Button
                size="sm"
                className="w-fit bg-slatedark-9 text-slatedark-12 hover:bg-slatedark-10"
                onClick={handleResetBoxData}
              >
                reset
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </ArcherContainer>
  )
}
